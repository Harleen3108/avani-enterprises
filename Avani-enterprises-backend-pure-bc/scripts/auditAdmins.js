#!/usr/bin/env node
/**
 * auditAdmins.js — list every account that can sign in to the admin panel.
 *
 *   node scripts/auditAdmins.js              # list all accounts
 *   node scripts/auditAdmins.js --revoke <email>   # disable one account
 *
 * WHY
 * POST /auth/signup was open to the world, and `role` defaults to "admin" in
 * models/User.js, so anyone who found the admin URL could register any email,
 * confirm the OTP sent to it, and receive a token with full admin rights. The
 * endpoint is now closed, but that does not undo accounts already created.
 *
 * Run this first. Anything you do not recognise should be revoked.
 *
 * ENV: MONGO_URI (already set in the Render service environment)
 */

const mongoose = require("mongoose");
const User = require("../models/User");

const args = process.argv.slice(2);
const revokeIdx = args.indexOf("--revoke");
const revokeEmail = revokeIdx !== -1 ? (args[revokeIdx + 1] || "").trim().toLowerCase() : null;

const fmt = (d) =>
  d ? new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

(async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  if (revokeEmail) {
    const user = await User.findOne({ email: revokeEmail });
    if (!user) {
      console.error(`❌ No account found for ${revokeEmail}`);
      await mongoose.disconnect();
      process.exit(1);
    }
    // Marked unverified and stripped of the admin role rather than deleted, so
    // the record survives for reference if this turns out to be an intrusion.
    user.isVerified = false;
    user.role = "revoked";
    await user.save();
    console.log(`✅ Revoked ${revokeEmail}. They can no longer sign in.`);
    console.log("   The record is kept, not deleted, in case you need it later.");
    await mongoose.disconnect();
    return;
  }

  const users = await User.find().sort({ createdAt: 1 }).lean();

  console.log(`\n${users.length} account(s) exist on this database.\n`);

  const canSignIn = users.filter((u) => u.isVerified && u.role !== "revoked");
  console.log(`  ${canSignIn.length} can sign in right now`);
  console.log(`  ${users.length - canSignIn.length} cannot (unverified or revoked)\n`);

  console.log("EMAIL".padEnd(38) + "NAME".padEnd(22) + "ROLE".padEnd(10) + "SIGN IN?".padEnd(10) + "CREATED");
  console.log("-".repeat(110));
  users.forEach((u) => {
    const active = u.isVerified && u.role !== "revoked";
    console.log(
      String(u.email || "—").padEnd(38) +
      String(u.name || "—").slice(0, 20).padEnd(22) +
      String(u.role || "—").padEnd(10) +
      (active ? "YES" : "no").padEnd(10) +
      fmt(u.createdAt)
    );
  });

  console.log("\nIf you do not recognise an account that can sign in, revoke it:");
  console.log("  node scripts/auditAdmins.js --revoke someone@example.com\n");

  await mongoose.disconnect();
})().catch((err) => {
  console.error("\n❌ Audit failed:", err.message);
  process.exit(1);
});

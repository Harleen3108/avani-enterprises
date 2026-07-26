#!/usr/bin/env node
/**
 * createAdmin.js — the only way to create an admin account now that public
 * self-registration is closed.
 *
 *   node scripts/createAdmin.js "Kapil Khandelwal" kp@avanienterprises.in
 *   node scripts/createAdmin.js "Name" email@domain.com --password 'chosen-password'
 *   node scripts/createAdmin.js --reset-password kp@avanienterprises.in
 *
 * Run it from the Render Shell, where MONGO_URI is already set. Requiring shell
 * access to the server is the point: it means creating an administrator needs
 * control of the infrastructure, not just an email address.
 *
 * With no --password, a strong one is generated and printed once. It is never
 * emailed and never stored in plain text.
 */

const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const args = process.argv.slice(2);

function flag(name) {
  const i = args.indexOf(name);
  return i === -1 ? null : (args[i + 1] || "").trim();
}

const resetEmail = flag("--reset-password");
const givenPassword = flag("--password");
const positional = args.filter((a, i) => !a.startsWith("--") && !String(args[i - 1] || "").startsWith("--"));

/** 20 chars from a 62-char alphabet, from a CSPRNG. */
function strongPassword() {
  const alphabet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(20);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || ""));
}

(async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set. Run this from the Render Shell.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  // ── Reset an existing admin's password ────────────────────────────────────
  if (resetEmail) {
    const user = await User.findOne({ email: resetEmail.toLowerCase() });
    if (!user) {
      console.error(`❌ No account for ${resetEmail}`);
      await mongoose.disconnect();
      process.exit(1);
    }
    const password = givenPassword || strongPassword();
    user.password = await bcrypt.hash(password, 10);
    user.isVerified = true;
    user.role = "admin";
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    console.log(`\n✅ Password reset for ${user.email}`);
    if (!givenPassword) console.log(`   New password: ${password}`);
    console.log("   Save it now — it is not stored in readable form and cannot be shown again.\n");
    await mongoose.disconnect();
    return;
  }

  // ── Create a new admin ────────────────────────────────────────────────────
  const [name, email] = positional;

  if (!name || !email) {
    console.error('\nUsage: node scripts/createAdmin.js "Full Name" email@domain.com [--password "..."]');
    console.error('       node scripts/createAdmin.js --reset-password email@domain.com\n');
    await mongoose.disconnect();
    process.exit(1);
  }
  if (!validEmail(email)) {
    console.error(`❌ "${email}" is not a valid email address.`);
    await mongoose.disconnect();
    process.exit(1);
  }
  if (givenPassword && givenPassword.length < 10) {
    console.error("❌ Choose a password of at least 10 characters, or omit --password to have one generated.");
    await mongoose.disconnect();
    process.exit(1);
  }

  const lower = email.toLowerCase();
  const existing = await User.findOne({ email: lower });
  if (existing && existing.isVerified) {
    console.error(`❌ ${lower} already exists. To change its password:`);
    console.error(`   node scripts/createAdmin.js --reset-password ${lower}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const password = givenPassword || strongPassword();
  const hashed = await bcrypt.hash(password, 10);

  if (existing) {
    existing.name = name;
    existing.password = hashed;
    existing.isVerified = true;
    existing.role = "admin";
    existing.otp = undefined;
    existing.otpExpires = undefined;
    await existing.save();
    console.log(`\n✅ Activated the existing unverified account ${lower} as an admin.`);
  } else {
    // isVerified is set directly: the OTP round-trip existed to prove the person
    // owned the address, and running this script already proves far more.
    await User.create({ name, email: lower, password: hashed, role: "admin", isVerified: true });
    console.log(`\n✅ Created admin ${lower}`);
  }

  if (!givenPassword) console.log(`   Password: ${password}`);
  console.log("   Save it now — it is hashed in the database and cannot be shown again.");
  console.log("   Change it after first sign-in from the admin Security page.\n");

  await mongoose.disconnect();
})().catch((err) => {
  console.error("\n❌ Failed:", err.message);
  process.exit(1);
});

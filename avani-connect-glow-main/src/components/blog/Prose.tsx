/**
 * Prose — article body plus the stylesheet that makes it legible.
 *
 * WHY THIS COMPONENT EXISTS
 * The body used to be a bare `<div className="avani-article">` with a separate
 * `<style>{PROSE_CSS}</style>` beside it. During a layout change the style tag
 * was dropped and the div was not, which is a silent, total failure: every
 * colour, all paragraph spacing, the heading scale and the list and table rules
 * live in PROSE_CSS, so the article fell back to the dark theme's cream body
 * colour and rendered invisibly on the light surface with no spacing at all.
 * It still built, still typechecked, and still passed a word-count check.
 *
 * Binding the two together in one component makes that failure impossible: you
 * cannot render the markup without the styles.
 */

import React from 'react';
import { formatBlogBody, PROSE_CSS } from '../../data/blogFormat';

export default function Prose({
  content,
  title,
  selfPath,
  className = '',
}: {
  content: string;
  title?: string;
  selfPath?: string;
  className?: string;
}) {
  return (
    <>
      <style>{PROSE_CSS}</style>
      <div
        className={`avani-article ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: formatBlogBody(content, { title, selfPath }) }}
      />
    </>
  );
}

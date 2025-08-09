'use client';
import React from 'react';

export default function EmbossedHeading({ text }: { text: string }) {
  return (
    <div className="emboss-wrap">
      <h1 className="emboss">{text}</h1>
    </div>
  );
}

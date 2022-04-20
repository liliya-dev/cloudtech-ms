import React from 'react';

export const Preview = ({ document }) => {
  const { _type, _id } = document.displayed;

  const url = `${process.env.SANITY_STUDIO_PROJECT_PATH}api/preview?_id=${_id}&_type=${_type}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`;

  // TODO: find a way to detect sanity route changes and ping api/exit-preview to unset the preview cookie?

  return (
    <div className="previewView">
      <style>{`
        .previewView {
          width: 100%;
          height: 100%;
        }

        .previewView iframe {
          border: 0;
          height: 100%;
          width: 100%;
        }
      `}</style>

      <iframe src={url} />
    </div>
  );
};

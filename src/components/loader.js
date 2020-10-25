import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={310}
    height={133}
    viewBox="0 0 310 133"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="12" y="52" rx="5" ry="5" width="290" height="10" />
    <rect x="11" y="79" rx="5" ry="5" width="290" height="10" />
    <rect x="13" y="105" rx="5" ry="5" width="290" height="10" />
    <rect x="11" y="8" rx="8" ry="8" width="172" height="18" />
  </ContentLoader>
);

export default Loader;

/**
 * Utility to generate responsive image properties (src, srcSet, sizes)
 * for images optimized to prevent PageSpeed "Improve image delivery" alerts.
 */

export interface ResponsiveImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
}

export function getResponsiveImageProps(
  src: string | undefined,
  defaultSizes?: string
): ResponsiveImageProps {
  if (!src) return { src: '' };

  const normalizedSrc = src.startsWith('./') ? '/' + src.slice(2) : src;
  const props: ResponsiveImageProps = { src: normalizedSrc };

  // 1. Main Logo
  if (normalizedSrc === '/logo0.webp') {
    props.src = '/logo0-96.webp';
    props.srcSet = '/logo0-64.webp 64w, /logo0-96.webp 96w';
    props.sizes = defaultSizes || '32px';
    return props;
  }

  // 2. Indus avatar/logo
  if (normalizedSrc === '/indus.webp') {
    props.src = '/indus-138.webp';
    props.srcSet = '/indus-92.webp 92w, /indus-138.webp 138w';
    props.sizes = defaultSizes || '46px';
    return props;
  }

  // 3. Assistant
  if (normalizedSrc === '/assistant-v2.webp') {
    props.src = '/assistant-v2-285.webp';
    props.srcSet = '/assistant-v2-190.webp 190w, /assistant-v2-285.webp 285w';
    props.sizes = defaultSizes || '95px';
    return props;
  }

  // 4. Policucue logo/avatar (jpeg -> webp)
  if (normalizedSrc === '/policucue.jpeg') {
    props.src = '/policucue-138.webp';
    props.srcSet = '/policucue-92.webp 92w, /policucue-138.webp 138w';
    props.sizes = defaultSizes || '46px';
    return props;
  }

  // 5. Small brand logos (paragon, kingspet, redball, thepage)
  if (normalizedSrc === '/paragon.png') {
    props.src = '/paragon-96.webp';
    props.srcSet = '/paragon-64.webp 64w, /paragon-96.webp 96w';
    props.sizes = defaultSizes || '32px';
    return props;
  }
  if (normalizedSrc === '/kingspet.png') {
    props.src = '/kingspet-96.webp';
    props.srcSet = '/kingspet-64.webp 64w, /kingspet-96.webp 96w';
    props.sizes = defaultSizes || '32px';
    return props;
  }
  if (normalizedSrc === '/redball.png') {
    props.src = '/redball-96.webp';
    props.srcSet = '/redball-64.webp 64w, /redball-96.webp 96w';
    props.sizes = defaultSizes || '32px';
    return props;
  }
  if (normalizedSrc === '/thepage.png') {
    props.src = '/thepage-96.webp';
    props.srcSet = '/thepage-64.webp 64w, /thepage-96.webp 96w';
    props.sizes = defaultSizes || '32px';
    return props;
  }

  // 6. whatwecreate services images
  if (normalizedSrc.startsWith('/whatwecreate/')) {
    const base = normalizedSrc.replace(/\.(webp|png|jpg|jpeg)$/, '');
    if (normalizedSrc.includes('aisolutions')) {
      props.src = `${base}-800.webp`;
      props.srcSet = `${base}-400.webp 400w, ${base}-800.webp 800w`;
      props.sizes = defaultSizes || '(max-width: 768px) 50vw, 373px';
    } else if (normalizedSrc.includes('socialmedia')) {
      props.src = `${base}-640.webp`;
      props.srcSet = `${base}-320.webp 320w, ${base}-640.webp 640w`;
      props.sizes = defaultSizes || '(max-width: 768px) 50vw, 311px';
    } else {
      props.src = `${base}-640.webp`;
      props.srcSet = `${base}-320.webp 320w, ${base}-640.webp 640w`;
      props.sizes = defaultSizes || '(max-width: 768px) 50vw, 263px';
    }
    return props;
  }

  return props;
}

import { onCleanup, onMount } from 'solid-js';
import lottie from 'lottie-web';
import pako from 'pako';

export function TGSPlayer(props: any) {
  let container: any;
  let animation: any;

  onMount(async () => {
    const response = await fetch(props.tgsPath);
    const tgsData = await response.arrayBuffer();
    
    const decompressedData = pako.inflate(new Uint8Array(tgsData), { to: 'string' });
    const lottieJson = JSON.parse(decompressedData);

    animation = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: lottieJson,
      initialSegment: [0, 180]
    });

    onCleanup(() => {
      animation.destroy();
    });
  });

  const handleMouseEnter = () => {
    if (animation) {
      animation.setDirection(1);
      animation.setSpeed(1.5);
      animation.play();
    }
  };

  const handleMouseLeave = () => {
    if (animation) {
      animation.setDirection(-1);
      animation.setSpeed(1);
      animation.play();
      animation.addEventListener('complete', () => {
        animation.setDirection(1);
        animation.setSpeed(1);
        animation.goToAndStop(0, true);
      });
    }
  };

  return (
    <div 
      style={{ height: '40px', width: '40px' }} 
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
}

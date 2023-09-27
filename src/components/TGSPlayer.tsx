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
      loop: true,
      autoplay: false,
      animationData: lottieJson
    });

    onCleanup(() => {
      animation.destroy();
    });
  });

  return (
    <div 
      style={{ height: '40px', width: '40px' }} 
      ref={container}
      onMouseEnter={() => animation && animation.play()}
      onMouseLeave={() => animation && animation.stop()}
    ></div>
  );
}

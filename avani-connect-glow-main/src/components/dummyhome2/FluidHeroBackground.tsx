import React, { useEffect, useRef } from 'react';

const VS = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FS = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  float random(in vec2 _st) {
      return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(in vec2 _st) {
      vec2 i = floor(_st);
      vec2 f = fract(_st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(in vec2 _st) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < 4; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      vec2 mouse = u_mouse;
      mouse.x *= u_resolution.x / u_resolution.y;

      // Subtly distort coordinates based on mouse distance
      float dist = distance(st, mouse);
      vec2 dir = st - mouse;
      float push = exp(-dist * 3.0);
      
      // Smooth, slow ripple effect towards cursor
      float ripple = sin(dist * 12.0 - u_time * 1.5) * push;
      vec2 displacedSt = st + dir * ripple * 0.03;

      // Fluid deformation
      vec2 q = vec2(0.);
      q.x = fbm( displacedSt + 0.05 * u_time);
      q.y = fbm( displacedSt + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm( displacedSt + 1.0*q + vec2(1.7,9.2) + 0.05*u_time );
      r.y = fbm( displacedSt + 1.0*q + vec2(8.3,2.8) + 0.05*u_time);

      float f = fbm(displacedSt + r);

      // Base dark colors: deep black to dark grey
      vec3 color = mix(vec3(0.01, 0.01, 0.01),
                       vec3(0.1, 0.1, 0.1),
                       clamp((f*f)*4.0, 0.0, 1.0));

      // Glass-like subtle highlight
      color += mix(vec3(0.0), vec3(0.05, 0.05, 0.05), smoothstep(0.4, 0.7, f));

      // Slight boost around mouse to show the interaction
      color += vec3(0.015) * push;

      gl_FragColor = vec4(color, 1.0);
  }
`;

export const FluidHeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, VS);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FS);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // State
    let animationFrame: number;
    let startTime = performance.now();
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const resize = () => {
      // Reduce pixel ratio on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2); 
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    // Attach mouse/touch listeners to the document/window so it follows anywhere
    // but the coordinates are mapped to the canvas bounds.
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      // In WebGL, Y is inverted (0 is bottom, 1 is top)
      targetMouseY = 1.0 - ((e.clientY - rect.top) / rect.height);
    };
    
    // Support touch
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = (e.touches[0].clientX - rect.left) / rect.width;
        targetMouseY = 1.0 - ((e.touches[0].clientY - rect.top) / rect.height);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const render = (time: number) => {
      // Lerp mouse for smoothness
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const elapsed = (time - startTime) * 0.001;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrame);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        objectFit: 'cover'
      }} 
    />
  );
};

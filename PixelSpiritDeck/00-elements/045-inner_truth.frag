// Title: Inner Truth
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) 2017-2022 Patricio Gonzalez Vivo - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work, the PixelSpirit Deck and all of its code and derivations.

// You cannot host, display, distribute or share this Work in any form,
// including physical and/or digital. You cannot use this Work in any
// commercial or non-commercial product, website, or project. You cannot
// sell this Work and you cannot mint any NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through a URL, with proper attribution and an unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me.  


#include "../lib/math.glsl"
#include "../lib/stroke.glsl"
#include "../lib/fill.glsl"
#include "../lib/rotate.glsl"
#include "../lib/rhombSDF.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st-.5)*1.1912+.5;
    st = mix(vec2((st.x*iResolution.x/iResolution.y)-(iResolution.x*.5-iResolution.y*.5)/iResolution.y,st.y), 
             vec2(st.x,st.y*(iResolution.y/iResolution.x)-(iResolution.y*.5-iResolution.x*.5)/iResolution.x), 
             step(iResolution.x,iResolution.y));
    st = (st-.5)*1.3+.5;
    //START
    st -= .5;
    float r = dot(st,st);
    float a = (atan(st.y,st.x)/PI);
    vec2 uv = vec2(a,r);
    vec2 grid = vec2(5.,log(r)*20.); 
    vec2 uv_i = floor(uv*grid);
    uv.x += .5*mod(uv_i.y,2.);
    vec2 uv_f = fract(uv*grid);
    float shape = rhombSDF(uv_f);
    color += fill(shape,.9)*
             step(.75,1.-r);
    //END
    gl_FragColor = vec4(color,1.);
}

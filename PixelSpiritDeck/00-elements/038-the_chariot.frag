// Number: VII
// Title: The Chariot
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


#include "../lib/stroke.glsl"
#include "../lib/rectSDF.glsl"
#include "../lib/rotate.glsl"
#include "../lib/flip.glsl"
#include "../lib/bridge.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st-.5)*1.1912+.5;
    if (iResolution.y > iResolution.x ) {
        st.y *= iResolution.y/iResolution.x;
        st.y -= (iResolution.y*.5-iResolution.x*.5)/iResolution.x;
    } else {
        st.x *= iResolution.x/iResolution.y;
        st.x -= (iResolution.x*.5-iResolution.y*.5)/iResolution.y;
    }
    //START
    float r1 = rectSDF(st, vec2(1.));
    float r2 = rectSDF(rotate(st,radians(45.)), 
                       vec2(1.));
    float inv = step(.5,(st.x+st.y)*.5);
    inv = flip(inv,step(.5,.5+(st.x-st.y)*.5));
    float w = .075;
    color += stroke(r1,.5,w) + stroke(r2,.5,w);
    float bridges = mix(r1,r2,inv);
    color = bridge(color, bridges, .5, w);
    //END
    gl_FragColor = vec4(color,1.);
}
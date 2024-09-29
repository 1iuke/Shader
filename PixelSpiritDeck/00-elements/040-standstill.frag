// Title: Turning point
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
#include "../lib/rotate.glsl"
#include "../lib/polySDF.glsl"
#include "../lib/bridge.glsl"
#include "../lib/flip.glsl"

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
    st = (st-.5)*1.75+.5;
    //START
    st = rotate(st, radians(-60.));
    st.y = flip(st.y,step(.5,st.x));
    st.y += .25;
    float down = polySDF(st,3);
    st.y = 1.5-st.y;
    float top = polySDF(st,3);
    color += stroke(top,.4,.15);
    color = bridge(color,down,.4,.15);
    //END
    gl_FragColor = vec4(color,1.);
}
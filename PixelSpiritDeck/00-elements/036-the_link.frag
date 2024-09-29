// Title: The Link
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


#include "../lib/fill.glsl"
#include "../lib/stroke.glsl"
#include "../lib/bridge.glsl"
#include "../lib/rotate.glsl"
#include "../lib/rectSDF.glsl"
#include "../lib/rhombSDF.glsl"

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
    st = (st-.5)*1.2+.5;
    //START;
    st = st.yx;
    st.x = mix(1.-st.x,st.x,step(.5,st.y));
    vec2 o = vec2(.1,.0);
    vec2 s = vec2(1.);
    float a = radians(45.);
    float l = rectSDF(rotate(st+o,a),s);
    float r = rectSDF(rotate(st-o,-a),s);
    color += stroke(l,.3,.1);
    color = bridge(color, r,.3,.1);
    color += fill(rhombSDF(abs(st.yx-
                           vec2(.0,.5))),
                 .1);
    //END
    gl_FragColor = vec4(color,1.);
}
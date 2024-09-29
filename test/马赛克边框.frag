
#iChannel0 "file://1.jpg"

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    int useBorder = 1;					// 是否使用马赛克边框
    float borderSize = 2.0;				// 马赛克边框大小(像素为单位)
	vec2 mosaicSize = vec2(20.0,20.0);	// 马赛克大小(像素为单位)

    vec2 id = floor(fragCoord / mosaicSize);
    vec2 mosaicCoord = id * mosaicSize;
    vec2 uv = mosaicCoord/iResolution.xy;
	fragColor = texture(iChannel0, uv);

    // Border
    // 以 马赛克大小=80 为例
    // (0,0)___(80,0)____(160,0)
    // pixelOffset = 85(假设当前像素坐标是85,0) - 80(起点是80)  = 5
	vec2 pixelOffset = fragCoord - mosaicCoord; // 当前像素到起点的像素个数
	float isBorder = step(min(pixelOffset.x, pixelOffset.y), borderSize);
    vec3 borderColor =  pow(fragColor.rgb, vec3(2.0)) * vec3(isBorder);
    // vec3 borderColor =  vec3(0.2,0.2,0.2) * vec3(isBorder); // 边框的颜色
    vec3 sceneColor = fragColor.rgb * vec3(1.0 - isBorder);
	fragColor = vec4(mix(fragColor.rgb, sceneColor + borderColor, float(useBorder)), 1.0);
    // fragColor = vec4(borderColor, 1.0);
}
float pi = 3.1415926;

mat2 rotateZ(float angle)
{
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

// 创建棋盘格(下列参数均以像素为单位)
// pos:当前坐标,size:棋盘格大小,threshold:aa大小
// return:0为奇行奇列或偶行偶列,1为奇行偶列或偶行奇列,0~1为aa值
float checkerboard(vec2 pos, vec2 size, float threshold)
{
    vec2 gc = floor(pos/size);// 网格坐标
    float flag = abs(mod(gc.x,2.0) - mod(gc.y,2.0));// abs=1表示奇行偶列或者偶行奇列
    
    // aa
    vec2 t1 = smoothstep(size,size-threshold,pos - floor(pos/size)*size);// 当前坐标在右、上 t像素的时候得到0~1的值,其余地方是1
    vec2 t2 = smoothstep(0.0,threshold,pos - floor(pos/size)*size);// 左、下得到0~1的值，其余是1,乘积得到四边的渐变值
    float aa = t1.x*t1.y*t2.x*t2.y;
    
    return flag*aa;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 size = vec2(30.0,30.0);// 棋盘格的大小(单位:像素)
    vec3 col1 = vec3(0.15);// 两个格子的颜色
    vec3 col2 = vec3(0.85);
    float threshold = 2.0;// aa(单位:像素)
    
    vec2 coord = fragCoord;
    //coord -= iResolution.xy / 2.0;
    float p = mod(iTime, 10.0) / 10.0;// 20s周期,得到0~1的值
    float v = abs(sin(p * pi)) * 45.0;// 每个周期内得到0->45度->0变化的角度
    coord *= rotateZ(radians(v));
    //coord += iResolution.xy / 2.0;
    
    float flag = checkerboard(coord, size, threshold);
    vec3 col = mix(col1, col2, flag);
    fragColor = vec4(col, 1.0);
}
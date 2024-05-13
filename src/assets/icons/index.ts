

// 导入指定上下文中的所有图像的函数
const importAll = (r: any) => {
  let svgs: Record<string, any> = {};
  r.keys().forEach((item: string, index: number) => {
    svgs[item.replace('./', '')] = r(item);
  });
  return svgs;
}
const req = require as any;

// 导入当前目录中带有png、jpeg或svg扩展名的所有图像
const svgs = importAll(req.context('./', false, /\.(png|jpe?g|svg)$/));



// 获取所有图像的名称
const Icons: Record<string, any> = {}

Object.keys(svgs).forEach((iconName) => {
  Icons[iconName.replace('./', '').replace('.svg', '')] = iconName.replace('./', '').replace('.svg', '')
})



export default Icons;

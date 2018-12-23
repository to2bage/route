class Model1 {
    getData () {
        return [
            {
                id: 1,
                name: "Niko"
            }, {
                id: 2,
                name: "Bellic"
            }
        ]
    }
}

console.log(new Model1().getData());
console.log(Model1.prototype.getData());

function wrap (Model, key) {
    // 获取Class的对应的原型
    let target = Model.prototype;

    // 获取函数对应的描述符
    let descriptor = Object.getOwnPropertyDescriptor(target, key);
    console.log("descriptor=> ", descriptor);

    // 生成新的函数, 添加耗时统计逻辑
    let log = function (...arg) {
        let start = new Date().valueOf();
        try {
            return descriptor.value.apply(this, arg)    // 调用之前的函数
        } finally {
            let end = new Date().valueOf();
            console.log(`start: ${start} <====> end: ${end} consume: ${end - start}`)
        }
    };

    // 将修改后的函数重新定义到原型
    Object.defineProperty(target, key, {
        ...descriptor,
        value: log
    })
}

wrap(Model1, "getData");

console.log(new Model1().getData());
console.log(Model1.prototype.getData());
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

function wrap (decorator) {
    return function (Model, key) {
        let target = Model.prototype;
        let descriptor = Object.getOwnPropertyDescriptor(target, key);

        console.log(key, "==> ", target, descriptor);

        decorator(target, key, descriptor);
    }
}

let log = function (target, key, descriptor) {
    // 将修改后的函数, 重新定义到原型链上
    Object.defineProperty(target, key, {
        ...descriptor,
        value: function (...arg) {
            let start = new Date().valueOf();
            try {
                return descriptor.value.apply(this, arg);
            } finally {
                let end = new Date().valueOf();
                console.log(`start: ${start} <====> end: ${end} consume: ${end - start}`);
            }
        }
    })
};

let seal = function (target, key, descriptor) {
    Object.defineProperty(target, key, {
        ...descriptor,
        writable: false
    })
};

// 参数的转换处理
log = wrap(log);
seal = wrap(seal);



// 添加耗时统计
log(Model1, "getData");

// console.log(Model1.prototype.getData());

const model1 = new Model1();
model1.getData();
;(function(Global) {
    const DefaultOption = { 
        selector: undefined,
    };
    const DefaultStatus = [];

    const _CodeReverl = function(option) {
        return new _CodeReverl.init(option);
    };

    const Selector = function (target) {
        const handleType = {
            'string': (e) => {
                return document.querySelectorAll(e);
            },
            'object': (e) => {
                if (e.Length <= 0 || [...e].some(i => !i.nodeName)) return undefined;
                return e;
            },
            'null': (e) => undefined,
            'undefined': (e) => undefined
        }
        //console.log(target, typeof(target), handleType[typeof(target)](target));
        return handleType[typeof(target)](target);
    };

    _CodeReverl.prototype = {}

    _CodeReverl.init = function(_option) {
        const Cr = this;
        Cr.option = {...DefaultOption};
        Cr.option.selector = Selector(_option.selector);
        Cr.status = [...DefaultStatus];

        if (!Cr.option.selector) return;
        Cr.option.selector.forEach((Reverl, Index) => {
            const newStatus = {
                id: Math.floor(Math.random() * 100) + '' + Index,
                el: Reverl,
                nowIndex: 0,
            };

            
            //console.log(Btns);

            const randerStatus = function(reverl) {
                const Prints =  reverl.querySelectorAll('.code-reveal-print');
                const Btns =    reverl.querySelectorAll('.code-reveal-btn');
                const toggleActive = function (el, index, targetIndex) {
                    el.classList.remove('active');
                    if (index === targetIndex) { el.classList.add('active')}
                }
                Btns.forEach((btn, index) => toggleActive(btn, index, newStatus.nowIndex));
                Prints.forEach((print, index) => toggleActive(print, index, newStatus.nowIndex));
            }

            const setEventListener = function (_reverl, _id, _codereverl) {
                const Btns = _reverl.querySelectorAll('.code-reveal-btn');
                Btns.forEach((btn, index) => {
                    btn.setAttribute('data-id', _id.toString());
                    btn.setAttribute('data-index', index.toString());
                    btn.addEventListener('click', function(e){
                        e.preventDefault();
                        const id = this.dataset['id'];
                        const index = this.dataset['index'];
                        const status = _codereverl.status.find(cr => cr.id === id);
                        status._nowIndex = Number(index);
                    })
                });
            }

            Object.defineProperty(newStatus, '_nowIndex', {
                get: function () {
                    return this.nowIndex;
                },
                set: function (e) {
                    this.nowIndex = e;
                    randerStatus(Reverl);
                }
            });
            setEventListener(Reverl, newStatus.id, Cr);
            Cr.status.push(newStatus);
        })
    };

    _CodeReverl.init.prototype = _CodeReverl.prototype;
    Global.CodeReverl = Global.CodeReverl ? Global.CodeReverl : _CodeReverl;
}(window));
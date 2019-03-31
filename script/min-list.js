
export default (function() {
    class minlist {
        options = {
            el: undefined, // display list
            template: undefined, // template
            titles_list: undefined, // get list title array
        };
        constructor (options) {
            Object.assign( this.options, options);
        }
    }

    return minlist;
}())
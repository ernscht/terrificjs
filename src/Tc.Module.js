/**
 * Base class for the different modules.
 *
 * @author Remo Brunschwiler
 * @namespace Tc
 * @class Module
 */
Tc.Module = Class.extend({

    /**
     * Initializes the Module.
     *
     * @method init
     * @constructor
     * @param {Node} ctx
     *      The context element
     * @param {Sandbox} sandbox
     *      The sandbox to get the resources from
     * @param {String} id
     *      The Unique module ID
     */
    init: function (ctx, sandbox, id) {
        /**
         * Contains the context node.
         *
         * @property ctx
         * @type Node
         */
        this.ctx = ctx;

        /**
         * The sandbox to get the resources from.
         *
         * @property sandbox
         * @type Sandbox
         */
        this.sandbox = sandbox;

        /**
         * Contains the unique module id.
         *
         * @property id
         * @type String
         */
        this.id = id;
    },

    /**
     * Starts the module.
     *
     * @method start
     * @return {Promise} The promise to synchronize after callbacks
     */
    start: function () {
        var callback = function() {
            if (this.after) {
                this.after();
            }
        }.bind(this);

        return new Promise(function(resolve) {
            if (this.on) {
                this.on(function () {
                   resolve(callback);
                });
            }
            else {
                resolve(callback);
            }
        }.bind(this));
    },

    /**
     * Template method to stop the module.
     *
     * @method stop
     */
    stop: function () {},

    /**
     * Template method for the main logic.
     *
     * @method on
     * @param {Function} callback
     *      The synchronize callbackk
     */
    on: function (callback) {
        callback();
    },

    /**
     * Template method for the synchronized logic.
     *
     * @method on
     */
    after: function () {}
});

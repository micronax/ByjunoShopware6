!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=(window.__sw__.assetPath + '/bundles/byjunopayments/'),n(n.s="8UdB")}({"096r":function(e){e.exports=JSON.parse('{"byjuno-log":{"general":{"mainMenuItemGeneral":"CembraPay Logs"}}}')},"8UdB":function(e,t,n){"use strict";n.r(t);var o=Shopware.Component,r=Shopware.Data.Criteria;o.register("byjuno-log-list",{template:'{% block byjuno_log_entity_list %}\r\n    <sw-page class="byjuno-log-list">\r\n        <template slot="content">\r\n            {% block byjuno_log_entity_list_content %}\r\n                <sw-entity-listing\r\n                    v-if="logs"\r\n                    :items="logs"\r\n                    :repository="repository"\r\n                    :showSelection="false"\r\n                    :columns="columns"\r\n                    :showSettings="false"\r\n                    :showActions="false"\r\n                    detailRoute="byjuno.log.detail">\r\n                </sw-entity-listing>\r\n            {% endblock %}\r\n        </template>\r\n    </sw-page>\r\n{% endblock %}\r\n',inject:["repositoryFactory"],data:function(){return{repository:null,logs:null,editable:!1,settings:!1,showSettings:!1}},metaInfo:function(){return{title:this.$createTitle()}},computed:{columns:function(){return[{property:"request_id",dataIndex:"request_id",label:"Request Id",routerLink:"byjuno.log.detail",allowResize:!0,primary:!0},{property:"request_type",dataIndex:"request_type",label:"Request Type",allowResize:!0},{property:"firstname",dataIndex:"firstname",label:"First Name",allowResize:!0},{property:"lastname",dataIndex:"last name",label:"Last Name",allowResize:!0},{property:"ip",dataIndex:"ip",label:"IP",allowResize:!0},{property:"byjuno_status",dataIndex:"byjuno_status",label:"Status",allowResize:!0},{property:"createdAt",dataIndex:"createdAt",label:"Date",allowResize:!0}]}},created:function(){var e=this;this.repository=this.repositoryFactory.create("byjuno_log_entity");var t=new r;t.addSorting(r.sort("createdAt","DESC")),this.repository.search(t,Shopware.Context.api).then((function(t){e.logs=t}))},methods:{openSettings:function(){this.showSettings=!1}}});var i=Shopware,l=i.Component,a=i.Mixin;l.register("byjuno-log-detail",{template:'{% block byjuno_log_entity_detail %}\r\n    <sw-page class="byjuno-log-detail">\r\n        <template slot="smart-bar-actions">\r\n            <sw-button :routerLink="{ name: \'byjuno.log.list\' }">\r\n                Return\r\n            </sw-button>\r\n        </template>\r\n\r\n        <template slot="content">\r\n            <sw-card-view>\r\n                <sw-card v-if="bundle" :isLoading="isLoading">\r\n                    <sw-textarea-field type="textarea" label="Request" v-model="bundle.xml_request"></sw-textarea-field>\r\n                    <sw-textarea-field type="textarea" label="Response" v-model="bundle.xml_response"></sw-textarea-field>\r\n            </sw-card-view>\r\n        </template>\r\n    </sw-page>\r\n{% endblock %}\r\n',inject:["repositoryFactory"],mixins:[a.getByName("notification")],metaInfo:function(){return{title:this.$createTitle()}},data:function(){return{bundle:null,isLoading:!1,processSuccess:!1,repository:null}},computed:{options:function(){return[{value:"absolute",name:this.$t("byjuno-log.detail.absoluteText")},{value:"percentage",name:this.$t("byjuno-log.detail.percentageText")}]}},created:function(){this.repository=this.repositoryFactory.create("byjuno_log_entity"),this.getBundle()},methods:{getBundle:function(){var e=this;this.repository.get(this.$route.params.id,Shopware.Context.api).then((function(t){e.bundle=t}))},onClickSave:function(){var e=this;this.isLoading=!0,this.repository.save(this.bundle,Shopware.Context.api).then((function(){e.getBundle(),e.isLoading=!1,e.processSuccess=!0})).catch((function(t){e.isLoading=!1,e.createNotificationError({title:"Error",message:t})}))},saveFinish:function(){this.processSuccess=!1}}});var s=n("096r"),u=n("eL0s");Shopware.Module.register("byjuno-log",{type:"plugin",name:"Bundle",title:"byjuno-log.general.mainMenuItemGeneral",description:"sw-property.general.descriptionTextModule",color:"#ff3d58",icon:"default-shopping-paper-bag-product",snippets:{"de-DE":s,"en-GB":u},routes:{list:{component:"byjuno-log-list",path:"list"},detail:{component:"byjuno-log-detail",path:"detail/:id",meta:{parentPath:"byjuno.log.list"}}},navigation:[{id:"sw-byjuno-log",parent:"sw-extension",label:"byjuno-log.general.mainMenuItemGeneral",color:"#ff3d58",path:"byjuno.log.list",icon:"default-shopping-paper-bag-product",position:100}]});var c=Object.freeze({BYJUNO_AUTH:"action.create.byjunoauth"}),p="order";Shopware.Component.override("sw-flow-sequence-action",{computed:{groups:function(){return this.actionGroups.unshift(p),this.$super("groups")},modalName:function(){return this.selectedAction===c.BYJUNO_AUTH?"byjuno-flow-plugin-modal":this.$super("modalName")}},methods:{getActionTitle:function(e){return e===c.BYJUNO_AUTH?{value:e,icon:"regular-file-text",label:this.$tc("ByjunoPayment.byjunoAuthFlow"),group:p}:this.$super("getActionTitle",e)}}});function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==d(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==d(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===d(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Shopware.Component.register("byjuno-flow-plugin-modal",{template:'{% block byjuno_flow_plugin_modal %}\r\n<sw-modal\r\n    class="byjuno-flow-plugin-modal"\r\n    :title="$tc(\'ByjunoPayment.byjunoCreateAuth\')"\r\n    @modal-close="onClose"\r\n>\r\n    {% block byjuno_flow_plugin_modal_content %}\r\n        <div>\r\n           {{ $tc(\'ByjunoPayment.byjunoCreateAuthText\') }}\r\n        </div>\r\n    {% endblock %}\r\n\r\n    {% block byjuno_flow_plugin_modal_footer %}\r\n    <template #modal-footer>\r\n        {% block byjuno_flow_plugin_modal_footer_cancel_button %}\r\n        <sw-button\r\n            class="byjuno-flow-plugin-modal__cancel-button"\r\n            size="small"\r\n            @click="onClose"        >\r\n            {{ $tc(\'global.default.cancel\') }}\r\n        </sw-button>\r\n        {% endblock %}\r\n\r\n        {% block byjuno_flow_plugin_modal_footer_save_button %}\r\n        <sw-button\r\n            class="byjuno-flow-plugin-modal__save-button"\r\n            variant="primary"\r\n            size="small"\r\n            @click="onAddAction"\r\n        >\r\n            {{ sequence.id\r\n            ? $tc(\'ByjunoPayment.byjunoButtonSaveAction\')\r\n            : $tc(\'ByjunoPayment.byjunoButtonAddAction\') }}\r\n        </sw-button>\r\n        {% endblock %}\r\n    </template>\r\n    {% endblock %}\r\n</sw-modal>\r\n{% endblock %}\r\n',props:{sequence:{type:Object,required:!0}},created:function(){this.createdComponent()},methods:{createdComponent:function(){},onClose:function(){this.$emit("modal-close")},onAddAction:function(){var e=y(y({},this.sequence),{},{config:y({},this.config)});this.$emit("process-finish",e)}}})},eL0s:function(e){e.exports=JSON.parse('{"byjuno-log":{"general":{"mainMenuItemGeneral":"CembraPay Logs"}}}')}});
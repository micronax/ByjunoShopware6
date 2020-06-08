(this.webpackJsonp=this.webpackJsonp||[]).push([["byjuno-payments"],{"/tP/":function(e,t){e.exports='{% block byjuno_log_entity_detail %}\n    <sw-page class="byjuno-log-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'byjuno.log.list\' }">\n                {{ $t(\'byjuno-log.detail.cancelButtonText\') }}\n            </sw-button>\n\n            <sw-button-process\n                :isLoading="isLoading"\n                :processSuccess="processSuccess"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onClickSave">\n                {{ $t(\'byjuno-log.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="bundle" :isLoading="isLoading">\n                    <sw-field :label="$t(\'byjuno-log.detail.nameLabel\')" v-model="bundle.name"></sw-field>\n                    <sw-field :label="$t(\'byjuno-log.detail.discountLabel\')" v-model="bundle.discount" type="number"></sw-field>\n\n                    <sw-field type="radio"\n                              :label="$t(\'byjuno-log.detail.discountTypeLabel\')"\n                              v-model="bundle.discountType"\n                              :options="options">\n                    </sw-field>\n\n                    <sw-entity-many-to-many-select\n                        :localMode="bundle.isNew()"\n                        :label="$t(\'byjuno-log.detail.assignProductsLabel\')"\n                        v-model="bundle.products">\n                    </sw-entity-many-to-many-select>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}\n'},"A3+v":function(e){e.exports=JSON.parse('{"byjuno-log":{"general":{"mainMenuItemGeneral":"Bundle","descriptionTextModule":"Verwalte die Bundles hier"},"list":{"addButtonText":"Bundle hinzufügen","columnName":"Name","columnDiscountType":"Rabatt Typ","columnDiscount":"Rabatt"},"detail":{"nameLabel":"Name","discountLabel":"Rabatt","discountTypeLabel":"Rabatt Typ","assignProductsLabel":"Produkte zuweisen","cancelButtonText":"Abbrechen","saveButtonText":"Speichern","errorTitle":"Fehler beim Speichern des Bundles","absoluteText":"Absolut","percentageText":"Prozentual"}},"sw-product":{"detail":{"bundleCardLabel":"Bundles","bundleSelectLabel":"Zugewiesene Bundles","bundleSelectPlaceholder":"Bundle hinzufügen..."}},"sw-condition":{"condition":{"cartContainsBundle":{"label":"Warenkorb enthält Bundle"}}}}')},D5Qm:function(e,t){e.exports='{% block byjuno_log_entity_list %}\n    <sw-page class="byjuno-log-list">\n        <template slot="content">\n            {% block byjuno_log_entity_list_content %}\n                <sw-entity-listing\n                    v-if="logs"\n                    :items="logs"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    :showSettings="false"\n                    :showActions="false"\n                    detailRoute="byjuno.log.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}\n'},R7tg:function(e){e.exports=JSON.parse('{"byjuno-log":{"general":{"mainMenuItemGeneral":"Bundle","descriptionTextModule":"Manage bundles here"},"list":{"addButtonText":"Add bundle","columnName":"Name","columnDiscountType":"Discount type","columnDiscount":"Discount"},"detail":{"nameLabel":"Name","discountLabel":"Discount","discountTypeLabel":"Discount type","assignProductsLabel":"Assign products","cancelButtonText":"Cancel","saveButtonText":"Save","errorTitle":"Error saving the bundle","absoluteText":"Absolute","percentageText":"Percentage"}},"sw-product":{"detail":{"bundleCardLabel":"Bundles","bundleSelectLabel":"Associated bundles","bundleSelectPlaceholder":"Add bundle..."}},"sw-condition":{"condition":{"cartContainsBundle":{"label":"Cart contains bundle"}}}}')},ln4B:function(e,t,n){"use strict";n.r(t);var o=n("D5Qm"),l=n.n(o);const{Component:s}=Shopware,{Criteria:i}=Shopware.Data;s.register("byjuno-log-list",{template:l.a,inject:["repositoryFactory"],data:()=>({repository:null,logs:null,editable:!1,settings:!1,showSettings:!1}),metaInfo(){return{title:this.$createTitle()}},computed:{columns(){return[{property:"request_id",dataIndex:"request_id",label:this.$t("byjuno-log.list.columnName"),routerLink:"byjuno.log.detail",allowResize:!0,primary:!0},{property:"request_type",dataIndex:"request_type",label:this.$t("byjuno-log.list.columnDiscount"),allowResize:!0},{property:"firstname",dataIndex:"firstname",label:this.$t("byjuno-log.list.columnDiscountType"),allowResize:!0},{property:"lastname",dataIndex:"lastname",label:this.$t("byjuno-log.list.columnDiscountType"),allowResize:!0},{property:"ip",dataIndex:"ip",label:this.$t("byjuno-log.list.columnDiscountType"),allowResize:!0},{property:"byjuno_status",dataIndex:"byjuno_status",label:this.$t("byjuno-log.list.columnDiscountType"),allowResize:!0},{property:"createdAt",dataIndex:"createdAt",label:this.$t("byjuno-log.list.columnDiscountType"),allowResize:!0}]}},created(){this.repository=this.repositoryFactory.create("byjuno_log_entity"),this.repository.search(new i,Shopware.Context.api).then(e=>{this.logs=e})},methods:{openSettings(){this.showSettings=!1}}});var a=n("/tP/"),u=n.n(a);const{Component:r,Mixin:d}=Shopware;r.register("byjuno-log-detail",{template:u.a,inject:["repositoryFactory"],mixins:[d.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({bundle:null,isLoading:!1,processSuccess:!1,repository:null}),computed:{options(){return[{value:"absolute",name:this.$t("byjuno-log.detail.absoluteText")},{value:"percentage",name:this.$t("byjuno-log.detail.percentageText")}]}},created(){this.repository=this.repositoryFactory.create("byjuno_log_entity"),this.getBundle()},methods:{getBundle(){this.repository.get(this.$route.params.id,Shopware.Context.api).then(e=>{this.bundle=e})},onClickSave(){this.isLoading=!0,this.repository.save(this.bundle,Shopware.Context.api).then(()=>{this.getBundle(),this.isLoading=!1,this.processSuccess=!0}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:this.$t("byjuno-log.detail.errorTitle"),message:e})})},saveFinish(){this.processSuccess=!1}}});var c=n("A3+v"),p=n("R7tg");const{Module:b}=Shopware;b.register("byjuno-log",{type:"plugin",name:"Bundle",title:"byjuno-log.general.mainMenuItemGeneral",description:"sw-property.general.descriptionTextModule",color:"#ff3d58",icon:"default-shopping-paper-bag-product",snippets:{"de-DE":c,"en-GB":p},routes:{list:{component:"byjuno-log-list",path:"list"},detail:{component:"byjuno-log-detail",path:"detail/:id",meta:{parentPath:"byjuno.log.list"}}},navigation:[{label:"byjuno-log.general.mainMenuItemGeneral",color:"#ff3d58",path:"byjuno.log.list",icon:"default-shopping-paper-bag-product",position:100}]})}},[["ln4B","runtime"]]]);
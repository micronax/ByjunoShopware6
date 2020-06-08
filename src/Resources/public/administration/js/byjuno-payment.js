(this.webpackJsonp = this.webpackJsonp || []).push([["byjuno-payment"], {
    "+k/5": function (e, t) {
        e.exports = '{% block swag_bundle_list %}\n    <sw-page class="swag-bundle-list">\n        {% block swag_bundle_list_smart_bar_actions %}\n            <template slot="smart-bar-actions">\n                <sw-button variant="primary" :routerLink="{ name: \'swag.bundle.create\' }">\n                    {{ $t(\'swag-bundle.list.addButtonText\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block swag_bundle_list_content %}\n                <sw-entity-listing\n                    v-if="bundles"\n                    :items="bundles"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    detailRoute="swag.bundle.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}\n'
    }, "+pqe": function (e, t) {
        e.exports = '{% block sw_product_detail_attribute_sets %}\n    {% parent() %}\n    <sw-card :title="$t(\'sw-product.detail.bundleCardLabel\')"\n             :isLoading="isLoading">\n        <sw-inherit-wrapper v-if="!isLoading"\n                            v-model="product.extensions.bundles"\n                            :inheritedValue="parentProduct.extensions ? parentProduct.extensions.bundles : null"\n                            :hasParent="!!parentProduct.id"\n                            :label="$t(\'sw-product.detail.bundleSelectLabel\')"\n                            isAssociation\n                            @inheritance-remove="saveProduct"\n                            @inheritance-restore="saveProduct">\n            <template #content="{ currentValue, isInherited, updateCurrentValue }">\n                <sw-entity-many-to-many-select\n                    :localMode="product.isNew()"\n                    :entityCollection="currentValue"\n                    @input="updateCurrentValue"\n                    labelProperty="name"\n                    :disabled="isInherited"\n                    :key="isInherited"\n                    :placeholder="$t(\'sw-product.detail.bundleSelectPlaceholder\')">\n                </sw-entity-many-to-many-select>\n            </template>\n        </sw-inherit-wrapper>\n    </sw-card>\n{% endblock %}\n'
    }, "7B7p": function (e, t) {
        const {Component: n} = Shopware;
        n.extend("swag-bundle-create", "swag-bundle-detail", {
            methods: {
                getBundle() {
                    this.bundle = this.repository.create(Shopware.Context.api)
                }, onClickSave() {
                    this.isLoading = !0, this.repository.save(this.bundle, Shopware.Context.api).then(() => {
                        this.isLoading = !1, this.$router.push({
                            name: "swag.bundle.detail",
                            params: {id: this.bundle.id}
                        })
                    }).catch(e => {
                        this.isLoading = !1, this.createNotificationError({
                            title: this.$t("swag-bundle.detail.errorTitle"),
                            message: e
                        })
                    })
                }
            }
        })
    }, AyTr: function (e, t, n) {
        "use strict";
        n.r(t);
        var a = n("+k/5"), s = n.n(a);
        const {Component: i} = Shopware, {Criteria: o} = Shopware.Data;
        i.register("swag-bundle-list", {
            template: s.a,
            inject: ["repositoryFactory"],
            data: () => ({repository: null, bundles: null}),
            metaInfo() {
                return {title: this.$createTitle()}
            },
            computed: {
                columns() {
                    return [{
                        property: "name",
                        dataIndex: "name",
                        label: this.$t("swag-bundle.list.columnName"),
                        routerLink: "swag.bundle.detail",
                        inlineEdit: "string",
                        allowResize: !0,
                        primary: !0
                    }, {
                        property: "discount",
                        dataIndex: "discount",
                        label: this.$t("swag-bundle.list.columnDiscount"),
                        inlineEdit: "number",
                        allowResize: !0
                    }, {
                        property: "discountType",
                        dataIndex: "discountType",
                        label: this.$t("swag-bundle.list.columnDiscountType"),
                        allowResize: !0
                    }]
                }
            },
            created() {
                this.repository = this.repositoryFactory.create("swag_bundle"), this.repository.search(new o, Shopware.Context.api).then(e => {
                    this.bundles = e
                })
            }
        });
        var l = n("OMZE"), r = n.n(l);
        const {Component: d, Mixin: u} = Shopware;
        d.register("swag-bundle-detail", {
            template: r.a,
            inject: ["repositoryFactory"],
            mixins: [u.getByName("notification")],
            metaInfo() {
                return {title: this.$createTitle()}
            },
            data: () => ({bundle: null, isLoading: !1, processSuccess: !1, repository: null}),
            computed: {
                options() {
                    return [{value: "absolute", name: this.$t("swag-bundle.detail.absoluteText")}, {
                        value: "percentage",
                        name: this.$t("swag-bundle.detail.percentageText")
                    }]
                }
            },
            created() {
                this.repository = this.repositoryFactory.create("swag_bundle"), this.getBundle()
            },
            methods: {
                getBundle() {
                    this.repository.get(this.$route.params.id, Shopware.Context.api).then(e => {
                        this.bundle = e
                    })
                }, onClickSave() {
                    this.isLoading = !0, this.repository.save(this.bundle, Shopware.Context.api).then(() => {
                        this.getBundle(), this.isLoading = !1, this.processSuccess = !0
                    }).catch(e => {
                        this.isLoading = !1, this.createNotificationError({
                            title: this.$t("swag-bundle.detail.errorTitle"),
                            message: e
                        })
                    })
                }, saveFinish() {
                    this.processSuccess = !1
                }
            }
        });
        n("7B7p");
        var c = n("R/kZ"), p = n("R2cx");
        const {Module: b} = Shopware;
        b.register("swag-bundle", {
            type: "plugin",
            name: "Bundle",
            title: "swag-bundle.general.mainMenuItemGeneral",
            description: "sw-property.general.descriptionTextModule",
            color: "#ff3d58",
            icon: "default-shopping-paper-bag-product",
            snippets: {"de-DE": c, "en-GB": p},
            routes: {
                list: {component: "swag-bundle-list", path: "list"},
                detail: {component: "swag-bundle-detail", path: "detail/:id", meta: {parentPath: "swag.bundle.list"}},
                create: {component: "swag-bundle-create", path: "create", meta: {parentPath: "swag.bundle.list"}}
            },
            navigation: [{
                label: "swag-bundle.general.mainMenuItemGeneral",
                color: "#ff3d58",
                path: "swag.bundle.list",
                icon: "default-shopping-paper-bag-product",
                position: 100
            }]
        });
        var w = n("+pqe"), m = n.n(w);
        const {Component: h} = Shopware;
        h.override("sw-product-detail-base", {
            template: m.a, computed: {
                productRepository() {
                    return this.repositoryFactory.create("product")
                }
            }, methods: {
                saveProduct() {
                    this.product && this.productRepository.save(this.product, Shopware.Context.api)
                }
            }
        });
        n("oRtI");
        var g = n("XM2Y"), y = n.n(g);
        const {Component: x} = Shopware;
        x.extend("swag-cart-contains-bundle", "sw-condition-base", {template: y.a});
        const {Application: v} = Shopware;
        v.addServiceProviderDecorator("ruleConditionDataProviderService", e => (e.addCondition("swagBundleContainsBundle", {
            component: "swag-cart-contains-bundle",
            label: "sw-condition.condition.cartContainsBundle.label",
            scopes: ["cart"]
        }), e))
    }, OMZE: function (e, t) {
        e.exports = '{% block swag_bundle_detail %}\n    <sw-page class="swag-bundle-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'swag.bundle.list\' }">\n                {{ $t(\'swag-bundle.detail.cancelButtonText\') }}\n            </sw-button>\n\n            <sw-button-process\n                :isLoading="isLoading"\n                :processSuccess="processSuccess"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onClickSave">\n                {{ $t(\'swag-bundle.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="bundle" :isLoading="isLoading">\n                    <sw-field :label="$t(\'swag-bundle.detail.nameLabel\')" v-model="bundle.name"></sw-field>\n                    <sw-field :label="$t(\'swag-bundle.detail.discountLabel\')" v-model="bundle.discount" type="number"></sw-field>\n\n                    <sw-field type="radio"\n                              :label="$t(\'swag-bundle.detail.discountTypeLabel\')"\n                              v-model="bundle.discountType"\n                              :options="options">\n                    </sw-field>\n\n                    <sw-entity-many-to-many-select\n                        :localMode="bundle.isNew()"\n                        :label="$t(\'swag-bundle.detail.assignProductsLabel\')"\n                        v-model="bundle.products">\n                    </sw-entity-many-to-many-select>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}\n'
    }, "R/kZ": function (e) {
        e.exports = JSON.parse('{"swag-bundle":{"general":{"mainMenuItemGeneral":"Bundle","descriptionTextModule":"Verwalte die Bundles hier"},"list":{"addButtonText":"Bundle hinzufügen","columnName":"Name","columnDiscountType":"Rabatt Typ","columnDiscount":"Rabatt"},"detail":{"nameLabel":"Name","discountLabel":"Rabatt","discountTypeLabel":"Rabatt Typ","assignProductsLabel":"Produkte zuweisen","cancelButtonText":"Abbrechen","saveButtonText":"Speichern","errorTitle":"Fehler beim Speichern des Bundles","absoluteText":"Absolut","percentageText":"Prozentual"}},"sw-product":{"detail":{"bundleCardLabel":"Bundles","bundleSelectLabel":"Zugewiesene Bundles","bundleSelectPlaceholder":"Bundle hinzufügen..."}},"sw-condition":{"condition":{"cartContainsBundle":{"label":"Warenkorb enthält Bundle"}}}}')
    }, R2cx: function (e) {
        e.exports = JSON.parse('{"swag-bundle":{"general":{"mainMenuItemGeneral":"Bundle","descriptionTextModule":"Manage bundles here"},"list":{"addButtonText":"Add bundle","columnName":"Name","columnDiscountType":"Discount type","columnDiscount":"Discount"},"detail":{"nameLabel":"Name","discountLabel":"Discount","discountTypeLabel":"Discount type","assignProductsLabel":"Assign products","cancelButtonText":"Cancel","saveButtonText":"Save","errorTitle":"Error saving the bundle","absoluteText":"Absolute","percentageText":"Percentage"}},"sw-product":{"detail":{"bundleCardLabel":"Bundles","bundleSelectLabel":"Associated bundles","bundleSelectPlaceholder":"Add bundle..."}},"sw-condition":{"condition":{"cartContainsBundle":{"label":"Cart contains bundle"}}}}')
    }, XM2Y: function (e, t) {
        e.exports = '{% block sw_condition_base_fields %}\n    <sw-field type="text" class="field--main" size="medium" :disabled="true">\n    </sw-field>\n{% endblock %}'
    }, oRtI: function (e, t) {
        const {Component: n} = Shopware;
        n.override("sw-product-detail", {
            computed: {
                productCriteria() {
                    const e = this.$super("productCriteria");
                    return e.addAssociation("bundles"), e
                }
            }
        })
    }
}, [["AyTr", "runtime"]]]);
define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {
			/**
			 * MyAttributeOne - used as event trigger.
			 */
			 "myEvents": {
				dependencies: [
					{
						columns: ["Name"],
						methodName: "onNameChange"
					},
					{
						columns: ["Email"],
						methodName: "onEmailChange"
					}
				]
			},
			"Account": {
				lookupListConfig: {
					columns: ["Owner","Owner.Email", "Country", "Country.Name"]
				}
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(){
				this.callParent(arguments);
			},
			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			 onEntityInitialized: function() {
				this.callParent(arguments);
			},

			/**
			 * Handler for Name value change
			 */
			 onNameChange: function(){
				var name = this.$Name;
				var colName = arguments[1];
				this.showInformationDialog("Value of column "+colName+" is: "+name);
			},
			/**
			 * Handler for Name value change
			 */
			 onEmailChange: function(){
				var email = this.$Email;
				var colName = arguments[1];
				this.showInformationDialog("Value of column "+colName+" is: "+email);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			 getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({Type: "Terrasoft.MenuSeparator",Caption: ""}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Page Action Item One",
					"Click": {bindTo: "onActionClick"},
					"Enabled": true,
					"Tag": "Item1",
					ImageConfig: this.get("Resources.Images.CreatioSquare"),
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Page Action Item Two",
					"Click": {bindTo: "onActionClick"},
					"Enabled": true,
					"Tag": "Item2",
					"Items": {"bindTo": "addSubItems"}
				}));
				return actionMenuItems;
			},

			addSubItems: function() {
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				collection.addItem(this.getButtonMenuItem({
					"Caption": "SubI tem1",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				collection.addItem(this.getButtonMenuItem({
					"Caption": "SubI tem1",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub1"
				}));
				return collection;
			},


			onActionClick: function(){
				let tag = arguments[0];

				//use tag to handle button clicks
				if(tag){
					this.showInformationDialog("Button with tag: "+tag+" clicked");
				}
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			
		]/**SCHEMA_DIFF*/
	};
});

define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({Type: "Terrasoft.MenuSeparator",Caption: ""}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Page Action Item One",
					"Click": {bindTo: "onActionClick"},
					"Enabled": true,
					"Tag": "Item1"
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
		}
	};
});

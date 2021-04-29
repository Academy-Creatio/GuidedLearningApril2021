define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes:{
			"Account": {
				lookupListConfig: {
					columns: ["Owner","Owner.Email", "Country", "Country.Name"]
				}
			}
		},
		messages: {
			//Subscribed on: ContactPageV2.GuidedLearningApril
			"SectionActionClicked": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}

		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[

			/** BUTTONS */
			{
				"operation": "insert",
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
				"propertyName": "items",
				"name": "MainContactButton",
				"values": {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					caption: "SECTION COMB",
					click: {bindTo: "onSectionButtonClick"},
					tag: "CombinedModeActionButtonsCardLeftContainer",
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"name": "MainContactSectionButton",
				"values": {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapClass": ["left-container-wrapClass"],
					},
					caption: "SECTION ABC",
					click: { bindTo: "onSectionButtonClick" },
					tag: "ActionButtonsContainer"
				}
			}



		]/**SCHEMA_DIFF*/,
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
			},

			onSectionButtonClick:function(){
				//this.showInformationDialog("Section Button clicked");
				this.sandbox.publish("SectionActionClicked", "message body", ["MY_UNIQUE_TAG"])
			}
		}
	};
});

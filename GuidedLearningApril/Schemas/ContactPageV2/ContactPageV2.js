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
		messages: {
			//Published on: ContactSectionV2.GuidedLearningApril
			"SectionActionClicked": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
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
				this.subscribeToMessages();
			},


			subscribeToMessages: function(){
				this.sandbox.subscribe(
					"SectionActionClicked",
					function(){this.onSectionMessageReceived();},
					this,
					["MY_UNIQUE_TAG"]
				)
			},

			onSectionMessageReceived: function(){
				var id = this.$Id
				
				var yB = this.Terrasoft.MessageBoxButtons.YES;
				yB.style = "GREEN";
				
				var nB = this.Terrasoft.MessageBoxButtons.NO;
				nB.style = "RED";

				this.showConfirmationDialog(
					"ARE YOU SURE YOU WANT TO PROCEED ?",
					function (returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
							return;
						}
						//window.console.log("yes clicked");
						this.doESQ();
					},
					[
						//this.Terrasoft.MessageBoxButtons.NO.returnCode,
						//this.Terrasoft.MessageBoxButtons.YES.returnCode
						yB.returnCode,
						nB.returnCode
					],
					null
				);
			},


			doESQ: function(){
							
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");


				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Name", "Mexico");
				var esqSecondFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Id", "e0be1264-f36b-1410-fa98-00155d043204");
				
				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);


				var i = 0;

				esq.getEntityCollection(
					function (result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}
						result.collection.each(
							function (item) {
								i++;
								var name = name + " "+item.$Name;
						});
						this.showInformationDialog("Total Accounts: " + i);
					},
					this
				);




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
			},

			onMyMainButtonClick: function(){

				var tag = arguments[3];
				this.showInformationDialog("Red button clicked with tag " + tag);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "MyRedButton",
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"values":{
					"layout": {
						"column": 0,
						"row": 3
					},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.RED,
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "ContactGeneralInfoBlock_Red"
				}
			},
			{
				"operation": "insert",
				"name": "MyGreenButton",
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"values":{
					"layout": {
						"column": 12,
						"row": 3
					},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "ContactGeneralInfoBlock_Green",
					"menu":{
						"items": [
							{
								caption: "Sub Item 1",
								click: {bindTo: "onMySubButtonClick"},
								visible: true,
								hint: "Sub item 1 hint",
								tag: "subItem1"
							 },
							 {
								 caption: "Sub Item 2",
								 click: {bindTo: "onMySubButtonClick"},
								 visible: true,
								 hint: "Sub item 2 hint",
								 tag: "subItem2"
							  }

						]
					}
				}
			},
			/** BUTTONS IN THE LEFT CONTAINER */
			{
				"operation": "insert",
				"name": "PrimaryContactButtonRed",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"values":{
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "LeftContainer_Red"
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryContactButtonGreen",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"values":{
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"caption": {"bindTo": "Resources.Strings.MyRedBtnCaption"},
					"hint": {"bindTo": "Resources.Strings.MyRedBtnHint"},
					"click": {"bindTo": "onMyMainButtonClick"},
					tag: "LeftContainer_Green",
					"menu":{
						"items": [
							{
								caption: "Sub Item 1",
								click: {bindTo: "onMySubButtonClick"},
								visible: true,
								hint: "Sub item 1 hint",
								tag: "subItem1"
							 },
							 {
								 caption: "Sub Item 2",
								 click: {bindTo: "onMySubButtonClick"},
								 visible: true,
								 hint: "Sub item 2 hint",
								 tag: "subItem2"
							  }

						]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

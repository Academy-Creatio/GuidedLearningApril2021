define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {
			/**
			 * MyAttributeOne - used as event trigger.
			 */
			// "myEvents": {
			// 	dependencies: [
			// 		{
			// 			columns: ["Name"],
			// 			methodName: "onNameChange"
			// 		},
			// 		{
			// 			columns: ["Email"],
			// 			methodName: "onEmailChange"
			// 		}
			// 	]
			// },
			// "Account": {
			// 	lookupListConfig: {
			// 		columns: ["Owner","Owner.Email", "Country", "Country.Name"]
			// 	}
			// }
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			// /**
			//  * @inheritdoc Terrasoft.BasePageV2#init
			//  * @override
			//  */
			// init: function(){
			// 	this.callParent(arguments);
			// },
			// /**
			//  * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			//  * @overridden
			//  * @protected
			//  */
			//  onEntityInitialized: function() {
			// 	this.callParent(arguments);
			// },

			// /**
			//  * Handler for Name value change
			//  */
			//  onNameChange: function(){
			// 	var name = this.$Name;
			// 	var colName = arguments[1];
			// 	this.showInformationDialog("Value of column "+colName+" is: "+name);
			// },
			/**
			 * Handler for Name value change
			 */
			onEmailChange: function(){
				this.callParent(arguments);
				this.showInformationDialog("Message from Custom package");
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Age",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

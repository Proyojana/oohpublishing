var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.mastermanagement.Customers.CustomersGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.currencyrategrid',
	closeAction: 'hide',
	selModel:sm,
	height:190,
	requires : ['MyDesktop.store.CurrencyRate'],

	id:'currencyrategrid',
	initComponent: function() {
		var ci = Ext.create('MyDesktop.store.CurrencyRate');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store=ci,
		this.columns = [{
			dataIndex: 'currency_rate_id',
			hidden:true
		},{
			dataIndex: 'currency_rate_gbp',
			text: 'USD per GBP',
			align: 'center',
			flex:1,
			filter: {
				type: 'string'
			}
		},{
			dataIndex: 'currency_rate_from',
			text: 'Valid From',
			align: 'center',
			flex:2,
			filter: {
				type: 'string'
			}
		},{
			dataIndex: 'currency_rate_to',
			text: 'Valid To',
			align: 'center',
			flex:2,
			filter: {
				type: 'string'
			}
		},{
			xtype:'actioncolumn',
			align: 'center',
			width:250,
			text:'Actions',
			items: [{
				iconCls: 'viewClass',
				tooltip: 'View',
				handler: function(grid, rowIndex, colIndex) {
					var currentForm = Ext.getCmp('currencyrateform');
					var rec = grid.getStore().getAt(rowIndex);
					var id=rec.get('currency_rate_id');
					currentForm.getForm().load({
						url: 'service/CurrencyRate.php',
						params: {
							action:3,
							id:id
						},
						failure: function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});

					Ext.getCmp('currency_rate_gbp').setReadOnly(true);
					Ext.getCmp('currency_rate_from').setReadOnly(true);
					Ext.getCmp('currency_rate_to').setReadOnly(true);
					
					//hide add,edit and reset buttons
					//Ext.getCmp('reset_currency_rate').getEl().hide();
					//Ext.getCmp('add_currency_rate').getEl().hide();
					//Ext.getCmp('edit_currency_rate').getEl().hide();
					
					Ext.getCmp('add_currency_rate').setVisible(false);
					Ext.getCmp('edit_currency_rate').setVisible(false);
					Ext.getCmp('reset_currency_rate').setVisible(false);
					Ext.getCmp('currencyrateaddform').setTitle('View Service');

				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {

					var currentForm = Ext.getCmp('currencyrateform');
					var rec = grid.getStore().getAt(rowIndex);
					var id=rec.get('currency_rate_id');
					currentForm.getForm().load({
						url: 'service/CurrencyRate.php',
						params: {
							action:3,
							id:id
						},
						failure: function(form, action) {
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
					//alert("value ");
					Ext.getCmp('currency_rate_gbp').setReadOnly(false);
					Ext.getCmp('currency_rate_from').setReadOnly(false);
					Ext.getCmp('currency_rate_to').setReadOnly(false);
					//show add,edit and reset buttons
					//Ext.getCmp('reset_currency_rate').getEl().show();
					//Ext.getCmp('add_currency_rate').getEl().show();
					//Ext.getCmp('edit_currency_rate').getEl().show();
					
					Ext.getCmp('add_currency_rate').setVisible(true);
					Ext.getCmp('edit_currency_rate').setVisible(true);
					Ext.getCmp('reset_currency_rate').setVisible(true);
					
				}
			},{
				iconCls: 'deleteClass',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('currency_rate_id')+' ?',+rec.get('currency_rate_id'), function (button) {
							if (button == 'yes') {
								var id=rec.get('currency_rate_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/CurrencyRate.php',
									method: 'POST',
									params : {
										action:4,
										id:id
									},
									success: function(response) {

										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message);

										Ext.getCmp('currencyrategrid').getStore().reload();

										Ext.getCmp('currencyrategrid').getView().refresh();
									},
									failure: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message);
									}
								});

							}
						});
					}
				}
			}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			]

		}),
		this.callParent(arguments);

	}
});
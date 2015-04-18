Ext.define('MyDesktop.view.projectmanagement.editproject.budget.budgetform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.budgetsform',
	id : 'budgetsform',
	layout : {
		type : 'absolute'
	},
	requires : ['MyDesktop.view.projectmanagement.editproject.budget.accountPayableInfoGrid','MyDesktop.view.projectmanagement.editproject.budget.budgetinfogrid','MyDesktop.view.projectmanagement.editproject.budget.accountReceivableInfoGrid','MyDesktop.view.projectmanagement.editproject.budget.budgetpayinfogrid','MyDesktop.view.projectmanagement.editproject.budget.budgetprofit'],
	//title:'Schedule for production',
	defaults : {

		labelWidth : 90,

	},

	defaultType : 'textfield',

	initComponent : function() {

		this.items = [{//here adding the Budgets Account Receivable
			xtype : 'label',
			text : 'Budgets Account Receivable',
			align : 'center',
			x : 10,
			y : 10,
			width : 300,
			style : {
				'font-weight' : 'bold',
			}

		}, {
			xtype : 'accountPayableInfoGrid',
			x : 5,
			y : 30
		}, 

	     //here adding Budgets Account Receivable Details
		{
			xtype : 'label',
			text : 'Budgets Account Receivable Details',
			align : 'center',
			x : 10,
			y : 180,
			width : 300,
			style : {
				'font-weight' : 'bold',
			}
		}, {
			xtype : 'budinfogrid',
			x : 5,
			y : 200,
			height:90
		},
		//Here adding Budgeted Expenses And Account Payables
		{

		 xtype:'label',
		 text : 'Budgeted Expenses And Account Payables',
		 align:'center',
		 x:10,
		 y:330,
		 allowBlank: false,
		 width:300,
		 style:{
		 'font-weight':'bold',
		 }
		 },
		 {
		 	xtype:'accountReceivableInfoGrid',
		 	x:5,
		 	y:360,
		 	width:750,
		 },
		 //Here adding the Budgeted Expenses And Account Payables Details
		 {

		 xtype:'label',
		 text : 'Budgeted Expenses And Account Payables Details',
		 align:'center',
		 x:10,
		 y:490,
		 allowBlank: false,
		 width:300,
		 style:{
		 'font-weight':'bold',
		 }
		 },
		 {
		 	xtype:'budgetpayinfogrid',
		 	x:5,
		 	y:520,
		 	height:90
		 },
		 //Here adding the project Profit
		 {

		 xtype:'label',
		 text : 'Project Profit',
		 align:'center',
		 x:10,
		 y:620,
		 allowBlank: false,
		 width:300,
		 style:{
		 'font-weight':'bold',
		 }
		 },
		 {
		 	xtype:'budgetprofit',
		 	x:5,
		 	y:640,
		 	height:90
		 },

		];
	

		this.callParent();
	}
});


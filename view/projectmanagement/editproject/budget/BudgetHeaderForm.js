 var type = Ext.create('Ext.data.Store', {
       autoLoad: true,
       fields: ['id', 'name'],
       data : [
        {"id":"1", "name":"Current"},
           {"id":"2", "name":"Completed"}
       ]
   });
  //var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var require_one = '<span style="color:blue;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('MyDesktop.view.projectmanagement.editproject.budget.BudgetHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.BudgetHeaderForm',
	
	id: 'BudgetHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:153,
	title:'Header Data',
	defaults: {
		labelWidth: 90,
	},
	//defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		
		{ 
			xtype: 'textfield',
width:150,
id:'editbudgetHeader_projectID',
x:750,
y:67,
hidden:true,

},
		
		{
			id:'editbudgetHeader_workflow',
			hidden:true,
		},
		
		{
		id:'editbudgetHeader_ClientCode',
		xtype: 'textfield',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
		
	},
	{
		id:'editbudgetHeader_ClientName',
		xtype: 'textfield',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		labelWidth: 98,
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'edit_Job_code',
		xtype: 'textfield',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
	},
	{
		id:'editbudgetHeader_ProjectName',
		xtype: 'textfield',
		fieldLabel: 'Project Name',
		x:760,
		readOnly: true,
		y:0,
		width:300,
		
	},
		
	{
		id:'editbudgetHeader_castoffextent',
		xtype: 'textfield',
		fieldLabel: 'Cast Off Extent',
		x:10,
		readOnly: true,
		y:30,
		width:220,
		
	},
	{
		id:'editbudgetHeader_confirmedextent',
		xtype: 'textfield',
		fieldLabel: 'Confirmed Extent',
		x:260,
		labelWidth: 98,
		readOnly: true,
		y:30,
		width:220,
		
	},
	{
		id:'edit_budgetHeader_ponumber1',
		xtype: 'textfield',
		fieldLabel: 'PO Numbers',
		x:510,
		y:30,
		
	},
	{
		id:'edit_budgetHeader_ponumber2',
		xtype: 'textfield',
		x:760,
		y:30,
	},
	{
		fieldLabel: 'Invoice Date',
		xtype:'datefield',
		width:200,
		id:"invoice_date",
		x:260,
		y:67,
		afterLabelTextTpl: require_one,
		
		
		listeners:
		{
          	// public event change - when selection1 dropdown is changed
           	change:    function(field, newValue, oldValue)
           	{
           		     		
           		var combo = Ext.getCmp('prostatus');

        		if(newValue==null)
   				{
   					combo.setValue("Current");	
   				}
   				else
   				{
   					combo.setValue("Completed");
   				}
	   		}
    	}
		
	},
	{
		fieldLabel: 'Author Name',
		xtype: 'textfield',
		id:'editbudgetHeader_author_name',
		x:10,
		y:67,
		
	},
	 {
                xtype:'combo',
                x:520,
                y:67,
                fieldLabel:'Status',
                store: type,
                id:'prostatus',
                queryMode: 'local',
                labelWidth: 80,
                displayField: 'name',
                valueField: 'id', 
                listeners: 
                {
                	afterrender: function(combo)
                	{
					   	var recordSelected = combo.getStore().getAt(1);                     
                        combo.setValue(recordSelected.get('id'));
                    },  
               }                                             
                                                       
    },
    
    
   	{
xtype:'label',
text:'Note:',

x:260,
y:95,
},
{

html:'<span style="background-color:#dfe8f5; color:blue;font-weight:bold">*</span>',
border:false,
x:315,
y:95,
width:8,

},
{
xtype:'label',
text:'Select Invoice Date to make the status from Current to Completed',
x:325,
y:95,

},
	]
	this.callParent();
}
});
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.departments.DeptAddForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.deptaddform',
   		id:'deptaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	requires:['MyDesktop.store.Deptcourse','MyDesktop.store.Deptreviewer'],
    title:'Add/Edit Departments',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
		var ci = Ext.create('MyDesktop.store.Deptcourse');
		var re = Ext.create('MyDesktop.store.Deptreviewer');
		//ci.load({params:{action:8}});
	    //ci.loadPage(1);
		this.items= [
			{
			id:'deptid',
			fieldLabel: 'Dept Name',
			name: 'deptid',
			hidden:true
			},
			
		{
			id:'deptcode',
			fieldLabel: 'Dept Code',
			name: 'deptcode',
			x:130,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
			id:'deptname',
			fieldLabel: 'Dept Name',
			name: 'deptname',
			align:'center',
			x:130,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	
		{   xtype: 'textarea',
			id:'deptdesc',
			fieldLabel: 'Description',
			name: 'deptdesc',			
			x:130,
			y:70,
			width:320,
			
    	},
    		{   xtype: 'combo',
			id:'courseoffer',
			fieldLabel: 'Course Offered',
			name: 'courseoffer',
			store:ci,
			displayField: 'deptcourse',
		    valueField: 'id',			
			x:490,
			y:10,
			width:320,
			
    	},
    	{   xtype: 'combo',
			id:'review',
			fieldLabel: 'Reviewer',
			name: 'review',
			store:re,
			displayField: 'deptreview',
		    valueField: 'id',				
			x:490,
			y:40,
			width:320,
			
    	},
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_dept',
			x:350,
			y:165,
			width:75,
			handler: function (){				
				var currentForm = this.up('deptform');
				var deptcode = Ext.getCmp('deptcode').getValue();
				var deptname = Ext.getCmp('deptname').getValue();
				var deptdesc= Ext.getCmp('deptdesc').getValue();
				var deptcourse= Ext.getCmp('courseoffer').getValue();
				var deptreview= Ext.getCmp('review').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Dept.php',
						method: 'POST',
						params : {action:5,deptcode:deptcode,deptname:deptname,deptdesc:deptdesc,deptcourse:deptcourse,deptreview:deptreview},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('deptgrid').getStore().reload();
							Ext.getCmp('depttab').layout.setActiveItem('deptgrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_dept',
			align:'center',
			x:450,
			y:165,
			width:75,
			handler: function ()
			   {
			   	var currentForm = this.up('deptform');
				var deptcode = Ext.getCmp('deptcode').getValue();
				var deptid = Ext.getCmp('deptid').getValue();
				var deptname = Ext.getCmp('deptname').getValue();
				var deptdesc= Ext.getCmp('deptdesc').getValue();
				var deptcourse= Ext.getCmp('courseoffer').getValue();
				var deptreview= Ext.getCmp('review').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Dept.php',
						method: 'POST',
						params : {action:4,deptid:deptid,deptcode:deptcode,deptname:deptname,deptdesc:deptdesc,deptcourse:deptcourse,deptreview:deptreview},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('deptgrid').getStore().reload();
							Ext.getCmp('depttab').layout.setActiveItem('deptgrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  	id:'reset_dept',
			x:550,
			y:165,
			width:75,
			handler: function (){
				var currentForm = this.up('deptform');
				currentForm.getForm().reset();
				Ext.getCmp('deptcode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 



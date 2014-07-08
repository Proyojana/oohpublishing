var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

   
Ext.define('MyDesktop.view.mastermanagement.Workflow.ClientGrid', {
	extend:'Ext.grid.Panel',
	title: 'Choose Client',
	alias:'widget.clientgrid',
	closeAction: 'hide',
	selModel:sm,
	id:'clientgrid',
requires:['MyDesktop.view.mastermanagement.Workflow.chooseClient'],
	initComponent: function() {
	
				this.tbar = Ext.create('Ext.Toolbar', {
			items:[' ',
				  {
               	xtype:'button',
               	id:'select_client',
               	text:'Select',
               	handler: function(grid, rowIndex, colIndex) {
               		//var rrfid= Ext.getCmp('resourceid').getValue();
					
            var win = Ext.create("Ext.window.Window", {
            layout: 'fit',
            maximizable: true,
            modal:true,
            width: 500,
            height: 400,
            items:[{
                xtype: 'chooseclient',
               
            }]
        });
        win.show();
               	}
               }
		/*	{
						xtype : 'button',
			id : 'selectf',
			text : ' Select',
			pressed:true,
			//iconCls: 'fileuploads',
			
			//disabled:true,
			width : 100,
			height : 25,		
			handler : function() {
				 var code = Ext.getCmp('workflow_code').getValue();
				
				var selection = Ext.getCmp('clientgrid').getSelectionModel().getSelection();
					var c='';
					for (var i=0; i < selection.length; i++) {
						//kras.remove(selection[i]);
					console.log(selection[i].data.id);
					
					c = c + selection[i].data.id+',';
					
					} 
				  var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/Workflow.php',
					 method: 'POST',
					 params : {action:6,code:code,clients:c},
					 success:function(response){
					 obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
					/* 	var grid1=Ext.getCmp('wfkrasgrid');
						grid1.getStore().load({params:{action:9,secid:secid,tid:tid}});
						var grid2=Ext.getCmp('sectionselectiongrid');
						grid2.getStore().load({params:{action:1,code:code}}); 
					 }
					 });
	
				}
			
		}*/]
	});
		var client = Ext.create('MyDesktop.store.Customers_Client');
		client.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	//	client.loadPage(1);
		this.store = client,

		this.columns = [
				{
					dataIndex: 'id',
					hidden:true
				},
				{
					dataIndex: 'code',
					text: 'Client Code',
					flex:1,
					align:'center',
					
				},
				{
					dataIndex: 'name',
					text: 'Client Name',
					flex:1,
					align:'center',
					
				},
];
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),
		
		this.callParent(arguments);

	}
});


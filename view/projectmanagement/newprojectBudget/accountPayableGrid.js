var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;
    
  
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.accountPayableGrid', {
	extend:'Ext.grid.Panel',
	title:'Budgeted Expenses and Accounts Payable',
	
	alias:'widget.accountPayableGrid',
	closeAction: 'hide',
	
	selModel:sm,
	requires:['MyDesktop.store.Budget'],
	id:'accountPayableGrid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
  
	initComponent: function() {
		
		
		function color(value, metaData, record, rowIndex, colIndex,store){
		return '<span style="background-color:#c0c0c0;">' + value + '</span>';
		}
		
		var country = Ext.create('MyDesktop.store.Budget');
		country.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		country.loadPage(1);
		
		this.store = country,
		this.columns = [
		
		        {				
					dataIndex: 'activity',
					text: 'Activity',
					 flex: 1,
					 align:'center',
					
				},
				{
					dataIndex: 'stage',
					text: 'Stage',
					flex: 1,align:'center',align:'center',
					/*editor: { xtype:'textfield'
					}*/
					
					
				},
				 {
				 	dataIndex: 'vendor',
		        	text: 'Vendor',
		        	flex: 1,align:'center',
		        	editor: { xtype:'combo'
					}
		        	
		       },
				{
					dataIndex: 'unit',
					text: 'Unit',
					flex: 1,
					align:'center',
					
				},
				{
					dataIndex: 'num_units_budgeted',
					text: 'No.of Units <br/>Budgeted',
					flex: 2,align:'center',
					editor: { xtype:'textfield'
					}
				},	
				{
					dataIndex: 'rate',
					text: 'Rate / Unit in USD',
					flex: 2,align:'center',
					 //renderer:color,
					
					editor: { xtype:'textfield'	,
					
					}
					
				},
				
				{
					dataIndex: 'budgeted_amount',
					text: 'Budgeted Amount <br/>in USD',
					flex: 2,align:'center',
					
		       },
		       
		       
	     	{
	     			dataIndex:'actual_unit',
		        	text: 'No. of Units<br/> Actual',
		        	editor: { xtype:'textfield'
					},
					flex: 2,align:'center',
		        	
		        }
		         ,
		        {
		        	dataIndex:'actual_amount',
		        	text: 'Actual Amount<br/>in USD',
		        	flex: 2,align:'center',
		        	
		        }
		        
			
				
		];
		 
			this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			//displayInfo: false,
			//displayMsg: 'Displaying topics {0} - {1} of {2}',
			//emptyMsg: "No topics to display",
			items:[
			{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				margin:'0 0 0 100',
				handler:function(){
					
				}
			}
			]
		});
		
		
		this.callParent(arguments);

	}
});
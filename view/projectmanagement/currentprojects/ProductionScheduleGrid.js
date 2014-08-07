Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionScheduleGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.pschedulegrid',
	closeAction: 'hide',
	height:110,
	hideHeaders:true,
	minSize: 50,
  maxSize: 100,
	enableColumnResize: true,
	id:'pschedulegrid',
	listeners: {
        'beforeedit': {
            fn: function () {
                return false;
            }
        }
   },
	 source: {
             "Received": "",
             "Report Due": "",
              "First Proof Received": "",
               "Revised Proof Received": "",
                "Voucher Deadline": "",
               }	
});

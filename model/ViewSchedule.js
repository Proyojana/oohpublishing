Ext.define('MyDesktop.model.ViewSchedule', {
        extend: 'Ext.data.Model',
        fields: [
           
              'schedule_id','schedule_stage','schedule_estimated_daysperstage','schedule_actual_daysperstage','schedule_estimated_start_date','schedule_actual_start_date','schedule_actual_end_date','schedule_bufferday'      
        ],
      //  idProperty: 'cityname'
    });
    
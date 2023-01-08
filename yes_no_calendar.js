		function create_real_calendar(parent_element_id, options){
		  var separ_newline = '<br/>'
          var row = options.title.row.length
		  var column = options.title.column.length
		  var parent_id = parent_element_id.getAttribute('id')
		  if(2*column < row){
		    parent_element_id.style.overflowY = 'scroll'
		  }
		  if(2*row < column){
		    parent_element_id.style.overflowX = 'scroll'
		  }
		  	var root_width = parent_element_id.clientWidth-2*options.edge.width_span
			var root_height = parent_element_id.clientHeight-2*options.edge.height_span
		  	var ele_width = (root_width)/(column+1)
			var ele_height = (root_height)/(row+1)
			parent_element_id.style.display = "flex"
			parent_element_id.style.flexWrap = "wrap"
			var flex_wrap_number = 0
			var fittable_columns = []
			var fittable_rows = []
			var fittable_title_row_tip = ''
			var fittable_title_column_tip = ''
			var scroll_in_x_axis = true
			if(ele_height<ele_width){
				ele_height = ele_width
				parent_element_id.style.flexDirection = "row";
				flex_wrap_number = column
				fittable_columns = options.title.column
				fittable_rows = options.title.row
				scroll_in_x_axis = false
			}else{
			  ele_width = ele_height
			  parent_element_id.style.flexDirection = "column";
			  flex_wrap_number = row
			  fittable_columns = options.title.row
			  fittable_rows = options.title.column
			  scroll_in_x_axis = true
			}
           var rorate_angle = 0
		   if(ele_width!=0){
			 rorate_angle = Math.atan2(ele_height, ele_width) * 180 / Math.PI
			}
		  var index = 0
		  $.each(new Array((row+1)*(column+1)), function(){
		    var ele = document.createElement('div')
			var row_index = 0
			var column_index = 0
			if(index == 0){
			  ele.innerHTML = separ_newline+options.title.tip.column+separ_newline+options.title.tip.row
			  ele.setAttribute('id', parent_id+'-0-0')
			  ele.style.backgroundColor = options.title.left_up_corner.bg_color
			  ele.style.fontSize = options.title.left_up_corner.font_size
			  ele.style.transform = 'rotate('+rorate_angle.toString()+'deg)';
			}
		    else if(index >0 && index < flex_wrap_number+1){
			   ele.style.display = 'flex'
			  if(scroll_in_x_axis){
				column_index = 0
				ele.style.display = 'flex'
				ele.style.backgroundColor = options.title.row_color
				ele.style.fontSize = options.title.column_font_size
				ele.style.alignItems = options.title.column_align_items?"center":"stretch"
			  }else{
			   column_index = index
				row_index = 0
				ele.style.backgroundColor = options.title.column_color
				ele.style.fontSize = options.title.row_font_size
				ele.style.alignItems = options.title.row_align_items?"center":"stretch"
			  }
			  ele.innerHTML = fittable_columns[index-1]
			  ele.setAttribute('id', parent_id+'-'+'r_'+row_index+'-'+'c_'+column_index)
			  ele.setAttribute('row',row_index)
			  ele.setAttribute('col',column_index)
			  ele.setAttribute('val',row_index.toString()+'-'+column_index.toString())

			  //ele.classList.add('row-title-cell')
			  ele.title = options.title.tip.column
			}else if(index % (flex_wrap_number+1) == 0){
			  var val = index / (flex_wrap_number+1)
			  ele.style.display = 'flex'
			  if(scroll_in_x_axis){
			    row_index = 0
			    column_index = val
				ele.style.backgroundColor = options.title.column_color
				ele.style.fontSize = options.title.column_font_size
				ele.style.alignItems = options.title.row_align_items?"center":"stretch"
			  }else{
			    row_index = val
			    column_index = 0
				ele.style.backgroundColor = options.title.row_color
				ele.style.fontSize = options.title.row_font_size
				ele.style.alignItems = options.title.column_align_items?"center":"stretch"
			  }
			  ele.setAttribute('id', parent_id+'-'+'r_'+row_index+'-'+'c_'+column_index)
			  ele.setAttribute('row',row_index)
			  ele.setAttribute('col',column_index)
			  ele.setAttribute('val',row_index.toString()+'-'+column_index.toString())
			  ele.innerHTML = fittable_rows[val-1]
			  ele.title = options.title.tip.row
			}else{
			  if(scroll_in_x_axis){
			    column_index = parseInt(index / (flex_wrap_number+1))
			    row_index = index % (flex_wrap_number+1)
			  }else{
			    row_index = parseInt(index / (flex_wrap_number+1))
			    column_index = index % (flex_wrap_number+1)
			  }

			  ele.setAttribute('id', parent_id+'-'+'r_'+row_index+'-'+'c_'+column_index)
			  ele.setAttribute('row',row_index)
			  ele.setAttribute('col',column_index)
			  ele.setAttribute('val',row_index.toString()+'-'+column_index.toString())
			  ele.innerHTML = row_index.toString()+'-'+column_index.toString()
			  if(index%2==0){
			    ele.style.display=options.a_status.display
				ele.style.fontSize = options.a_status.font_size
				ele.style.cursor = options.a_status.cursor
				ele.style.alignItems = options.a_status.align_item?"center":"stretch"
				ele.style.backgroundColor = options.a_status.bg_color
			  }else{
			    ele.style.display=options.b_status.display
				ele.style.fontSize = options.b_status.font_size
				ele.style.cursor = options.b_status.cursor
				ele.style.alignItems = options.b_status.align_item?"center":"stretch"
				ele.style.backgroundColor = options.b_status.bg_color
			  }
			  ele.title = query_date+' '+row_index.toString()+' '+column_index.toString()
		    }


			ele.style.width = ele_width+'px'
			ele.style.height = ele_height+'px'
			ele.style.textAlign = 'center';
			ele.style.alignItem = 'center'
			ele.style.justifyContent = 'center'
			w = document.createElement("a")
			w.href = '#'
			ele.appendChild(w)
			ele.addEventListener("click", event => {
				console.log(event);
			});
			parent_element_id.appendChild(ele)
			index++
		  })
		}
		

		function create_calendar_container(options, root_element_id){
		  var root = document.getElementById(root_element_id)
		  var cell_root= root.children[1]
		  var root_width = cell_root.clientWidth
		  var root_height = cell_root.clientHeight
		  var arr = new Array(options.row_count * options.column_count)
		  $.each(arr, function(index){
		    var child = document.createElement('div')
			child.setAttribute('id','every_calendar_container'+'-'+index.toString())
			child.style.backgroundColor = options.bg_color
		    cell_root.appendChild(child)
			child.style.width = ((root_width-1)/options.row_count)+'px'
			child.style.height = ((root_height-1)/options.column_count)+'px'
			create_real_calendar(child, options)
			
		  })
		  
		}
		
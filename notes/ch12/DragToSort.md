# Drag To Sort

* Implementing a dragging to sorting animation
* Cards are absolutely positioned
* When dragging the card position, we calculate the offset based on the y-position.
* If offset changes, we swap the offsets and spring from one position to another.
* Otherwise, we spring to its current offset.
* See: rn-app-examples/src/DragToSort

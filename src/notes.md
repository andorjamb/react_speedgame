# Margit's method

put this in the div className=circles in the sectin returned by App:

{this.state.circles.map((circle, i)=>(
    <Circle key={i} id={i+1} click={()=>this.clickHandler(i)} /> . alternatively: click={this.clickHandler.bind(i)}
))}

where i is the index of the circle in the array
state ={
    circles: [1,2,3,4],
}
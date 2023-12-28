class PriorityQueue {
    constructor(comparator = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1]<b[1])) {
        this.items = [];
        this.comparator = comparator;
    }

    add(item) {
        this.items.push(item);
        let index = this.items.length - 1;
        let parent = Math.floor((index - 1) / 2);

        while (index > 0 && this.comparator(this.items[index], this.items[parent])) {
            [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    poll() {
        if (this.isEmpty()) {
            return null;
        }

        const item = this.items[0];
        const last = this.items.pop();

        if (this.items.length > 0) {
            this.items[0] = last;
            this.heapify(0);
        }

        return item;
    }

    heapify(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;

        if (left < this.items.length && this.comparator(this.items[left], this.items[smallest])) {
            smallest = left;
        }

        if (right < this.items.length && this.comparator(this.items[right], this.items[smallest])) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
            this.heapify(smallest);
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


const distanceFrom = (sPoint, ePoint) =>{
    let total = 0;
    let xDiff = Math.abs(sPoint[0]  - ePoint[0])
    let yDiff = Math.abs(sPoint[1] - ePoint[1])
    while (xDiff > 0 && yDiff > 0){
        total += 14
        xDiff -= 1;
        yDiff -= 1;
    }
    total += xDiff * 10 + yDiff * 10
    return total
}

export const AStar = async (eRow, eCol, cRow, cCol, height, width, nodes, setCellValue) => {
    //console.log("Hello");
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]]
    let array = Array.from({ length: height }, () => Array.from({ length: width }, () => []));
    var queue = new PriorityQueue();
    queue.add([0,0,cRow, cCol])
    let found = false;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    while (!queue.isEmpty() && found === false){

        //console.log(queue)
        const [index, m, r,c] = queue.poll();
        console.log("next chose is " +index+ " (" +r+","+c+") ")
        if (r !== cRow || c !== cCol) setCellValue(r, c, "checked");
        await delay(10)

        for (const [lr, ud] of dirs){
            const newR = r+lr;
            const newC = c + ud;
            if (newR >= 0 && newR < height && newC >= 0 && newC < width){
                if (nodes[newR][newC][2] === "end-node"){
                    array[newR][newC] = [r, c] 
                    found = true;
                    break;
                }else if (nodes[newR][newC][2] === "empty" && nodes[newR][newC][0] === false){
                    console.log("checking (" +newR+","+newC+") has value of " + (distanceFrom([newR, newC], [eRow, eCol]) 
            + distanceFrom([newR, newC], [cRow, cCol])))
                    let eVal = distanceFrom([newR, newC], [eRow, eCol])
                    let sVal = distanceFrom([newR, newC], [cRow, cCol])
                    const val = (eVal + sVal);
                    nodes[newR][newC][0] = true
                    array[newR][newC] = [r, c]
                    queue.add([val, eVal, newR, newC])
                    setCellValue(newR, newC, "potential")
                }
            }
        }
        if(found)
        {
            let [r,c] = [eRow, eCol]
            while (nodes[r][c][2] !== "start-node"){
                const [nextR, nextC] = array[r][c]
                await delay(100)
                if (nodes[nextR][nextC][2] === "start-node"){
                    break;
                }else{
                    [r,c] = [nextR, nextC]
                    setCellValue(nextR, nextC, "path")
                }
            }
        }
    }
    return false
}
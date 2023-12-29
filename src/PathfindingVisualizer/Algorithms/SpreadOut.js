//import PriorityQueue from 'queue-priority';
class PriorityQueue {
    constructor(comparator = (a, b) => a[0] < b[0]) {
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


export const SpreadOut = async (cRow, cCol, nodes, height, width, setCellValue) => {
    var queue = new PriorityQueue();  // Initialize an empty priority queue
    queue.add([0, cRow, cCol]);  // Add the starting position to the queue

    let array = Array.from({ length: height }, () => Array.from({ length: width }, () => []));
    const dirs = [[-1,0],[0,1],[1,0],[0,-1]]
    let found = null;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (!queue.isEmpty()) {
        var [i, r, c] = queue.poll();  // Correctly poll the queue
        
        if (r !== cRow || c !== cCol) setCellValue(r, c, "checked");
        
        await delay(10);

        for (const [lr, ud] of dirs) {
            // Use 'for...of' for iterating over 'dirs'
            const newR = r + lr;
            const newC = c + ud;

            if (newR >= 0 && newR < height && newC >= 0 && newC < width) {
                if (nodes[newR][newC][2] === "end-node") {
                    found = [newR, newC];
                    array[newR][newC] = [r, c];
                    break;  // Break out of the loop once the end node is found
                } else if (nodes[newR][newC][2] === "empty" && nodes[newR][newC][0] === false) {
                    if(Math.abs(dirs[0]) + Math.abs(dirs[1]) === 2) queue.add([i+1.4, newR, newC])
                    else queue.add([i + 1, newR, newC]);
                    array[newR][newC] = [r, c];
                    nodes[newR][newC][0] = true;
                    setCellValue(newR, newC, "potential")
                }
            }
        }
        if (found !== null) {
            let [r,c] = [found[0], found[1]]
            while (nodes[r][c][2] !== "start-node"){
                const [nextR, nextC] = array[r][c]
                await delay(100)
                if (nodes[nextR][nextC][2] === "start-node"){
                    console.log("Break");
                    return;
                }else{
                    [r,c] = [nextR, nextC]
                    setCellValue(nextR, nextC, "path")
                }
            }
        }
    }
    return false
};

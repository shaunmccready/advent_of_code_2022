export type Files = {
    name: string
    size: number
}

export type NodeData = {
    nodeName: string
    files: Files[]
    directories: Map<string, TreeNode>
    totalSize: number
}

export class TreeNode {
    public data: NodeData = {} as NodeData

    constructor(nodeName: string, files?: Files[], directories?: Map<string, TreeNode | null>) {
        this.data = {
            nodeName: '',
            files: [],
            directories: new Map<string, TreeNode>(),
            totalSize: 0
        }

        this.data.nodeName = nodeName

        if (files) {
            this.data.files = files
        }

        if (directories) {
            this.data.directories
        }
    }

    addDirectory(name: string, node: TreeNode): void {
        this.data.directories.set(name, node)
    }

    addfile(file: Files): void {
        this.data.files.push(file)
    }

    getCurrentDirectoryName(): string {
        return this.data.nodeName
    }

    getChildDirectory(name: string): TreeNode {
        return this.data.directories.get(name)!
    }

    getDirectorySize() {
        return this.data.totalSize
    }

    setDirectorySize(size: number): void {
        this.data.totalSize = size
    }
}

export function printOutTree(myTree: TreeNode, numOfSpaces: number): void {
    let whitespaces = ''.padStart(numOfSpaces)

    console.log(`${whitespaces}- ${myTree.getCurrentDirectoryName()} (DIR) Size=${myTree.getDirectorySize()}`)

    if (myTree.data.directories.size > 0) {
        for (let dirs of myTree.data.directories.values()) {
            printOutTree(dirs, numOfSpaces + 4)
        }
    }

    myTree.data.files.forEach((file) => {
        whitespaces = ''.padStart(numOfSpaces + 4)
        console.log(`${whitespaces}- ${file.name} (size=${file.size})`)
    })
}

export function calculateSizesOfDirectories(myTree: TreeNode): void {
    let totalSize = myTree.getDirectorySize()

    if (myTree.data.directories.size > 0) {
        for (let dirs of myTree.data.directories.values()) {
            calculateSizesOfDirectories(dirs)
        }

        for (let dirs of myTree.data.directories.values()) {
            totalSize = totalSize + dirs.getDirectorySize()
        }
    }

    for (let fileToAdd of myTree.data.files) {
        totalSize = totalSize + fileToAdd.size
    }

    myTree.setDirectorySize(totalSize)
}

type DirectoryWithSize = {
    name: string
    size: number
}

export function getAllDirectoriesWithAtMostSize(myTree: TreeNode, atMostSize: number): DirectoryWithSize[] {
    const directoriesToReturn: DirectoryWithSize[] = []

    function recurseTreeForFileSizes(myTree: TreeNode, atMostSize: number) {
        if (myTree.data.directories.size > 0) {
            for (let dirs of myTree.data.directories.values()) {
                recurseTreeForFileSizes(dirs, atMostSize)
            }
        }

        if (myTree.getDirectorySize() <= atMostSize) {
            directoriesToReturn.push({ name: myTree.getCurrentDirectoryName(), size: myTree.getDirectorySize() })
        }
    }

    recurseTreeForFileSizes(myTree, atMostSize)

    return directoriesToReturn
}

export function getAllDirectorySizesWithAtLeast(myTree: TreeNode, atLeastSize: number): DirectoryWithSize[] {
    const directoriesToReturn: DirectoryWithSize[] = []

    function recurseTreeForFileSizes(myTree: TreeNode, atLeastSize: number) {
        if (myTree.data.directories.size > 0) {
            for (let dirs of myTree.data.directories.values()) {
                recurseTreeForFileSizes(dirs, atLeastSize)
            }
        }

        if (myTree.getDirectorySize() >= atLeastSize) {
            directoriesToReturn.push({ name: myTree.getCurrentDirectoryName(), size: myTree.getDirectorySize() })
        }
    }

    recurseTreeForFileSizes(myTree, atLeastSize)

    return directoriesToReturn
}

export function getSmallestDirectory(directories: DirectoryWithSize[]) {
    let smallestDirectory: DirectoryWithSize | undefined = undefined

    for (let dir of directories) {
        if (!smallestDirectory || smallestDirectory.size > dir.size) smallestDirectory = dir
    }

    return smallestDirectory
}

export function calculateSumOfAllDirectories(directoryArray: DirectoryWithSize[]): number {
    let sum = 0
    for (let val of directoryArray) {
        sum = sum + val.size
    }

    return sum
}

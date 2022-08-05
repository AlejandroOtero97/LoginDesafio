const apiControllers = {
    getName: async (req, res) => {
        const user = await req.user;
        res.status(200).json({name: user?.username});
    },
    getInfo: (req, res) => {
        res.json({
            argvs: process.argv.slice(2),
            nodeVersion: process.version,
            platform: process.platform,
            memory: process.memoryUsage().rss,
            pathEject: process.execPath,
            id: process.pid,
            pathProject: process.cwd()
        })
    },
}

export default apiControllers;
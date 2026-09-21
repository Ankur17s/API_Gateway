const info = (req, res) => {
    return res.json({
        success: true,
        message: 'API is Live',
        data: {},
        error: {},
    })
}

module.exports = {
    info
}
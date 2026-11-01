// Run: node --test tests/icon-position-persistence.test.js
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

function load(file, symbol, globals = {}) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8')
    return vm.runInNewContext(source + '\n' + symbol, globals)
}

function setup(savedData) {
    let stored = savedData ? JSON.stringify(savedData) : null
    const localStorage = {
        getItem(key) { return key === 'YouTube-Thumbnail-Icon' ? stored : null },
        setItem(key, value) {
            if (key === 'YouTube-Thumbnail-Icon') stored = value
        }
    }
    const callbacks = []
    const state = load('components/app-main/app-main-data.js', 'appMainData()', {
        PRESET_ICONS: []
    })
    Object.assign(state, load('components/app-main/app-main-methods-loading.js',
        'appMainMethodsLoading', { localStorage }))
    const watchers = load('components/app-main/app-main-watch.js', 'appMainWatch')
    state.$nextTick = callback => callbacks.push(callback)
    state.drawIconLazy = () => {}
    state.inited = true
    return {
        state,
        watchers,
        flush() { while (callbacks.length) callbacks.shift()() },
        saved() { return JSON.parse(stored) }
    }
}

test('Hidden position survives a custom icon URL being restored from localStorage', () => {
    const app = setup({ iconURL: 'https://example.com/saved.png', iconPosition: 0 })
    app.state.dataLoad()
    assert.equal(app.state.restoringSavedState, true)
    assert.equal(app.state.iconPosition, 0)
    // Vue runs queued watchers before the $nextTick callback.
    app.watchers.iconURL.call(app.state, app.state.iconURL)
    assert.equal(app.state.iconPosition, 0)
    app.flush()
    assert.equal(app.state.restoringSavedState, false)
    app.state.dataSave()
    assert.equal(app.saved().iconPosition, 0)
})

test('manually replacing a hidden icon still shows the corner icon', () => {
    const app = setup({ iconURL: 'https://example.com/old.png', iconPosition: 0 })
    app.state.dataLoad()
    app.watchers.iconURL.call(app.state, app.state.iconURL)
    app.flush()
    app.state.iconURL = 'https://example.com/new.png'
    app.watchers.iconURL.call(app.state, app.state.iconURL)
    assert.equal(app.state.iconPosition, 3)
    app.state.dataSave()
    assert.equal(app.saved().iconPosition, 3)
})

test('other saved positions are not reset on reload', () => {
    const app = setup({ iconURL: 'https://example.com/saved.png', iconPosition: 7 })
    app.state.dataLoad()
    app.watchers.iconURL.call(app.state, app.state.iconURL)
    app.flush()
    assert.equal(app.state.iconPosition, 7)
})

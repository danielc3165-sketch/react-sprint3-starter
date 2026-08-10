import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'notes'

export const noteService = {
    query,
    getById,
    save,
    remove,
}

const gNotes = [
    {
        id: 'n101',
        type: 'NoteTxt',
        isPinned: true,
        createdAt: 1112222,
        style: {
            backgroundColor: '#f7d154',
        },
        info: {
            txt: 'Remember to buy milk',
        },
    },
    {
        id: 'n102',
        type: 'NoteTxt',
        isPinned: false,
        createdAt: 1112223,
        style: {
            backgroundColor: '#b9f6ca',
        },
        info: {
            txt: 'Finish the MissKeep project',
        },
    },
    {
        id: 'n103',
        type: 'NoteImg',
        isPinned: false,
        createdAt: 1112224,
        style: {
            backgroundColor: '#d7aefb',
        },
        info: {
            title: 'A beautiful view',
            url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600',
        },
    },
    {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        createdAt: 1112225,
        style: {
            backgroundColor: '#a7d8f5',
        },
        info: {
            title: 'Today',
            todos: [
                { txt: 'Study React', doneAt: null },
                { txt: 'Push the branch', doneAt: null },
            ],
        },
    },
]

_createNotes()

function _createNotes() {
    const notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        utilService.saveToStorage(NOTE_KEY, gNotes)
    }
}

function query() {
    return storageService.query(NOTE_KEY)
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}
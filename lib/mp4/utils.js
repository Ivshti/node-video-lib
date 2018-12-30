'use strict';

module.exports = {
    ATOM_MOOV: 'moov',
    ATOM_MVHD: 'mvhd',
    ATOM_TRAK: 'trak',
    ATOM_TKHD: 'tkhd',
    ATOM_MDIA: 'mdia',
    ATOM_MDHD: 'mdhd',
    ATOM_MINF: 'minf',
    ATOM_HDLR: 'hdlr',
    ATOM_VMHD: 'vmhd',
    ATOM_SMHD: 'smhd',
    ATOM_DINF: 'dinf',
    ATOM_STBL: 'stbl',
    ATOM_STSZ: 'stsz',
    ATOM_STCO: 'stco',
    ATOM_STSS: 'stss',
    ATOM_STTS: 'stts',
    ATOM_STSC: 'stsc',
    ATOM_CO64: 'co64',
    ATOM_STSD: 'stsd',
    ATOM_CTTS: 'ctts',
    ATOM_AVC1: 'avc1',
    ATOM_AVCC: 'avcC',
    ATOM_HEV1: 'hev1',
    ATOM_HVCC: 'hvcC',
    ATOM_MP4A: 'mp4a',
    ATOM_ESDS: 'esds',
    ATOM_MDAT: 'mdat',
    ATOM_FTYP: 'ftyp',

    TRACK_TYPE_VIDEO: 'vide',
    TRACK_TYPE_AUDIO: 'soun',

    createAtom: function createAtom(type) {
        let AtomClass = require('./atoms/atom-' + type);
        return new AtomClass();
    },

    buildAtoms: function buildAtoms(atoms) {
        let buffers = [];
        let bufferSizes = 0;
        for (let atom of atoms) {
            let buffer = atom.build();
            let size = 8 + buffer.length;
            let header = new Buffer(8);
            header.writeUInt32BE(size, 0);
            header.write(atom.type(), 4);
            buffers.push(header, buffer);
            bufferSizes += size;
        }
        return Buffer.concat(buffers, bufferSizes);
    },

};

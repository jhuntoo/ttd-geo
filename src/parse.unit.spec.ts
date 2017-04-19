import {expect} from 'chai'
import {parse} from './parse';
describe('Parse', () => {

    describe('valid record', () => {
        const input = '2014-12-03 04:59:59.0993	9804	22a99b5b-de0a-4f4f-aa78-5fb1e1a2910b	179E014C-7369-48E3-8C81-303DCFD3DCBD	189b0040-87f1-4e86-8b37-9164fd91c5df	0.61983468000	qzvqehi	wuif5kke	hm7736z		zofj9nb4	728	90	0	True	0001-01-01 00:00:00.0000		4		d00r2s4	71	0x449EB5C1	1.08000	97.68.237.19	{"tc":0.00024115701680000,"aid":"nx5xyrp","dgu":[{"deu":[{"id":2519868,"c":0.00008677685520000,"tpb":"zdkbnki","tpid":"34062","rrs":0.140000,}],"id":"eafchzf","rc":33,"rbs":0,"rbe":720},{"deu":[{"id":2519144,"c":0.00016115701680000,"tpb":"zdkbnki","tpid":"5952","rrs":0.260000,},{"id":2519521,"c":0.00016115701680000,"tpb":"zdkbnki","tpid":"30789","used":true,"rrs":0.260000,}],"id":"iine687","rc":19,"rbs":0,"rbe":720},{"deu":[{"id":2523842,"c":0.00008677685520000,"tpb":"zdkbnki","tpid":"5733","rrs":0.140000,}],"id":"mu3ej75","rc":39,"rbs":0,"rbe":720},{"deu":[{"id":-7,"c":0.000040,"tpb":"integral","tpid":"-7","used":true,"rcpm":0.040000}],"id":"charge-allIntegralBrandSafety",},{"deu":[{"id":-11,"c":0.000040,"tpb":"integral","tpid":"-11","used":true,"rcpm":0.040000}],"id":"charge-allIntegralSuspiciousActivity",}],"rc":19,"rbs":0,"rbe":720}	True	64308		0.00001100000		en,es		{"10":0.00000100000,"2":0.000010000}		1	0		0.00086099169680000	0.0009908996554545454545454545	0.0009908996554545454545454545	1.00000000000	1.00000000000	0000000047549899	000000003c37162e	2	0		6s2idq3	{"10":{"AdjustmentOperationType":"ImpressionCountSamplingAdjustment","SamplingRateAttribute":"0.100000"}}';
        let parsedIp;
        before(() => {
            parsedIp = parse(input);
        });
        it('should parse IP as `97.68.237.19`', () => {
            expect(parsedIp.value).to.equal('97.68.237.19');
        });
    });

})
const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { plural: `${su.cammelCase(entity)}s` }) {
  opts = ou.smartCopy(opts, defaults)

  return `
  describe('${su.capitalize(opts.plural)}NewController', () => {
    beforeEach(angular.mock.module('app'));
  
    let element, scope, compile, $ctrl, $httpBackend;
  
    beforeEach(inject(($compile, $rootScope, CacheFactory, _$httpBackend_) => {
      CacheFactory.destroy('unittests.local-storage')
      CacheFactory.destroy('unittests.session-storage')
      $httpBackend = _$httpBackend_;
  
      // Setup fake BE
      $httpBackend.whenGET(/.+/).respond(200, { data: {} })
      $httpBackend.whenPOST(/.+/).respond(200, { data: {} })
      $httpBackend.whenPUT(/.+/).respond(200, { data: {} })
      $httpBackend.whenPATCH(/.+/).respond(200, { data: {} })
  
      scope = $rootScope.$new();
      compile = $compile;
      element = angular.element('<${su.dasherize(opts.plural)}-new></${su.dasherize(opts.plural)}-new>')
      element = compile(element)(scope)
      scope.$digest();
      $ctrl = angular.element(element).controller('${su.cammelCase(opts.plural)}New')
    }))
  
    // Tests here!
    it('Exists', () => {
      expect($ctrl).toBeDefined();
    })
  
    it('AppContent is defined', () => {
      expect($ctrl.appContent).toBeDefined();
    })
  })
  `
}

module.exports = generate;

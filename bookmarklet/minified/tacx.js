javascript:var%20%24jscomp%3D%24jscomp%7C%7C%7B%7D%3B%24jscomp.scope%3D%7B%7D%3B%24jscomp.createTemplateTagFirstArg%3Dfunction(a)%7Breturn%20a.raw%3Da%7D%3B%24jscomp.createTemplateTagFirstArgWithRaw%3Dfunction(a%2Cb)%7Ba.raw%3Db%3Breturn%20a%7D%3B%24jscomp.ASSUME_ES5%3D!1%3B%24jscomp.ASSUME_NO_NATIVE_MAP%3D!1%3B%24jscomp.ASSUME_NO_NATIVE_SET%3D!1%3B%24jscomp.SIMPLE_FROUND_POLYFILL%3D!1%3B%24jscomp.ISOLATE_POLYFILLS%3D!1%3B%24jscomp.FORCE_POLYFILL_PROMISE%3D!1%3B%24jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION%3D!1%3B%24jscomp.defineProperty%3D%24jscomp.ASSUME_ES5%7C%7C%22function%22%3D%3Dtypeof%20Object.defineProperties%3FObject.defineProperty%3Afunction(a%2Cb%2Cc)%7Bif(a%3D%3DArray.prototype%7C%7Ca%3D%3DObject.prototype)return%20a%3Ba%5Bb%5D%3Dc.value%3Breturn%20a%7D%3B%24jscomp.getGlobal%3Dfunction(a)%7Ba%3D%5B%22object%22%3D%3Dtypeof%20globalThis%26%26globalThis%2Ca%2C%22object%22%3D%3Dtypeof%20window%26%26window%2C%22object%22%3D%3Dtypeof%20self%26%26self%2C%22object%22%3D%3Dtypeof%20global%26%26global%5D%3Bfor(var%20b%3D0%3Bb%3Ca.length%3B%2B%2Bb)%7Bvar%20c%3Da%5Bb%5D%3Bif(c%26%26c.Math%3D%3DMath)return%20c%7Dthrow%20Error(%22Cannot%20find%20global%20object%22)%3B%7D%3B%24jscomp.global%3D%24jscomp.getGlobal(this)%3B%24jscomp.IS_SYMBOL_NATIVE%3D%22function%22%3D%3D%3Dtypeof%20Symbol%26%26%22symbol%22%3D%3D%3Dtypeof%20Symbol(%22x%22)%3B%24jscomp.TRUST_ES6_POLYFILLS%3D!%24jscomp.ISOLATE_POLYFILLS%7C%7C%24jscomp.IS_SYMBOL_NATIVE%3B%24jscomp.polyfills%3D%7B%7D%3B%24jscomp.propertyToPolyfillSymbol%3D%7B%7D%3B%24jscomp.POLYFILL_PREFIX%3D%22%24jscp%24%22%3Bvar%20%24jscomp%24lookupPolyfilledValue%3Dfunction(a%2Cb)%7Bvar%20c%3D%24jscomp.propertyToPolyfillSymbol%5Bb%5D%3Bif(null%3D%3Dc)return%20a%5Bb%5D%3Bc%3Da%5Bc%5D%3Breturn%20void%200!%3D%3Dc%3Fc%3Aa%5Bb%5D%7D%3B%24jscomp.polyfill%3Dfunction(a%2Cb%2Cc%2Cd)%7Bb%26%26(%24jscomp.ISOLATE_POLYFILLS%3F%24jscomp.polyfillIsolated(a%2Cb%2Cc%2Cd)%3A%24jscomp.polyfillUnisolated(a%2Cb%2Cc%2Cd))%7D%3B%24jscomp.polyfillUnisolated%3Dfunction(a%2Cb%2Cc%2Cd)%7Bc%3D%24jscomp.global%3Ba%3Da.split(%22.%22)%3Bfor(d%3D0%3Bd%3Ca.length-1%3Bd%2B%2B)%7Bvar%20e%3Da%5Bd%5D%3Bif(!(e%20in%20c))return%3Bc%3Dc%5Be%5D%7Da%3Da%5Ba.length-1%5D%3Bd%3Dc%5Ba%5D%3Bb%3Db(d)%3Bb!%3Dd%26%26null!%3Db%26%26%24jscomp.defineProperty(c%2Ca%2C%7Bconfigurable%3A!0%2Cwritable%3A!0%2Cvalue%3Ab%7D)%7D%3B%24jscomp.polyfillIsolated%3Dfunction(a%2Cb%2Cc%2Cd)%7Bvar%20e%3Da.split(%22.%22)%3Ba%3D1%3D%3D%3De.length%3Bd%3De%5B0%5D%3Bd%3D!a%26%26d%20in%20%24jscomp.polyfills%3F%24jscomp.polyfills%3A%24jscomp.global%3Bfor(var%20f%3D0%3Bf%3Ce.length-1%3Bf%2B%2B)%7Bvar%20k%3De%5Bf%5D%3Bif(!(k%20in%20d))return%3Bd%3Dd%5Bk%5D%7De%3De%5Be.length-1%5D%3Bc%3D%24jscomp.IS_SYMBOL_NATIVE%26%26%22es6%22%3D%3D%3Dc%3Fd%5Be%5D%3Anull%3Bb%3Db(c)%3Bnull!%3Db%26%26(a%3F%24jscomp.defineProperty(%24jscomp.polyfills%2Ce%2C%7Bconfigurable%3A!0%2Cwritable%3A!0%2Cvalue%3Ab%7D)%3Ab!%3D%3Dc%26%26(void%200%3D%3D%3D%24jscomp.propertyToPolyfillSymbol%5Be%5D%26%26(c%3D1E9*Math.random()%3E%3E%3E0%2C%24jscomp.propertyToPolyfillSymbol%5Be%5D%3D%24jscomp.IS_SYMBOL_NATIVE%3F%24jscomp.global.Symbol(e)%3A%24jscomp.POLYFILL_PREFIX%2Bc%2B%22%24%22%2Be)%2C%24jscomp.defineProperty(d%2C%24jscomp.propertyToPolyfillSymbol%5Be%5D%2C%7Bconfigurable%3A!0%2Cwritable%3A!0%2Cvalue%3Ab%7D)))%7D%3B%24jscomp.underscoreProtoCanBeSet%3Dfunction()%7Bvar%20a%3D%7Ba%3A!0%7D%2Cb%3D%7B%7D%3Btry%7Breturn%20b.__proto__%3Da%2Cb.a%7Dcatch(c)%7B%7Dreturn!1%7D%3B%24jscomp.setPrototypeOf%3D%24jscomp.TRUST_ES6_POLYFILLS%26%26%22function%22%3D%3Dtypeof%20Object.setPrototypeOf%3FObject.setPrototypeOf%3A%24jscomp.underscoreProtoCanBeSet()%3Ffunction(a%2Cb)%7Ba.__proto__%3Db%3Bif(a.__proto__!%3D%3Db)throw%20new%20TypeError(a%2B%22%20is%20not%20extensible%22)%3Breturn%20a%7D%3Anull%3B%24jscomp.arrayIteratorImpl%3Dfunction(a)%7Bvar%20b%3D0%3Breturn%20function()%7Breturn%20b%3Ca.length%3F%7Bdone%3A!1%2Cvalue%3Aa%5Bb%2B%2B%5D%7D%3A%7Bdone%3A!0%7D%7D%7D%3B%24jscomp.arrayIterator%3Dfunction(a)%7Breturn%7Bnext%3A%24jscomp.arrayIteratorImpl(a)%7D%7D%3B%24jscomp.makeIterator%3Dfunction(a)%7Bvar%20b%3D%22undefined%22!%3Dtypeof%20Symbol%26%26Symbol.iterator%26%26a%5BSymbol.iterator%5D%3Breturn%20b%3Fb.call(a)%3A%24jscomp.arrayIterator(a)%7D%3B%24jscomp.generator%3D%7B%7D%3B%24jscomp.generator.ensureIteratorResultIsObject_%3Dfunction(a)%7Bif(!(a%20instanceof%20Object))throw%20new%20TypeError(%22Iterator%20result%20%22%2Ba%2B%22%20is%20not%20an%20object%22)%3B%7D%3B%24jscomp.generator.Context%3Dfunction()%7Bthis.isRunning_%3D!1%3Bthis.yieldAllIterator_%3Dnull%3Bthis.yieldResult%3Dvoid%200%3Bthis.nextAddress%3D1%3Bthis.finallyAddress_%3Dthis.catchAddress_%3D0%3Bthis.finallyContexts_%3Dthis.abruptCompletion_%3Dnull%7D%3B%24jscomp.generator.Context.prototype.start_%3Dfunction()%7Bif(this.isRunning_)throw%20new%20TypeError(%22Generator%20is%20already%20running%22)%3Bthis.isRunning_%3D!0%7D%3B%24jscomp.generator.Context.prototype.stop_%3Dfunction()%7Bthis.isRunning_%3D!1%7D%3B%24jscomp.generator.Context.prototype.jumpToErrorHandler_%3Dfunction()%7Bthis.nextAddress%3Dthis.catchAddress_%7C%7Cthis.finallyAddress_%7D%3B%24jscomp.generator.Context.prototype.next_%3Dfunction(a)%7Bthis.yieldResult%3Da%7D%3B%24jscomp.generator.Context.prototype.throw_%3Dfunction(a)%7Bthis.abruptCompletion_%3D%7Bexception%3Aa%2CisException%3A!0%7D%3Bthis.jumpToErrorHandler_()%7D%3B%24jscomp.generator.Context.prototype%5B%22return%22%5D%3Dfunction(a)%7Bthis.abruptCompletion_%3D%7B%22return%22%3Aa%7D%3Bthis.nextAddress%3Dthis.finallyAddress_%7D%3B%24jscomp.generator.Context.prototype.jumpThroughFinallyBlocks%3Dfunction(a)%7Bthis.abruptCompletion_%3D%7BjumpTo%3Aa%7D%3Bthis.nextAddress%3Dthis.finallyAddress_%7D%3B%24jscomp.generator.Context.prototype.yield%3Dfunction(a%2Cb)%7Bthis.nextAddress%3Db%3Breturn%7Bvalue%3Aa%7D%7D%3B%24jscomp.generator.Context.prototype.yieldAll%3Dfunction(a%2Cb)%7Bvar%20c%3D%24jscomp.makeIterator(a)%2Cd%3Dc.next()%3B%24jscomp.generator.ensureIteratorResultIsObject_(d)%3Bif(d.done)this.yieldResult%3Dd.value%2Cthis.nextAddress%3Db%3Belse%20return%20this.yieldAllIterator_%3Dc%2Cthis.yield(d.value%2Cb)%7D%3B%24jscomp.generator.Context.prototype.jumpTo%3Dfunction(a)%7Bthis.nextAddress%3Da%7D%3B%24jscomp.generator.Context.prototype.jumpToEnd%3Dfunction()%7Bthis.nextAddress%3D0%7D%3B%24jscomp.generator.Context.prototype.setCatchFinallyBlocks%3Dfunction(a%2Cb)%7Bthis.catchAddress_%3Da%3Bvoid%200!%3Db%26%26(this.finallyAddress_%3Db)%7D%3B%24jscomp.generator.Context.prototype.setFinallyBlock%3Dfunction(a)%7Bthis.catchAddress_%3D0%3Bthis.finallyAddress_%3Da%7C%7C0%7D%3B%24jscomp.generator.Context.prototype.leaveTryBlock%3Dfunction(a%2Cb)%7Bthis.nextAddress%3Da%3Bthis.catchAddress_%3Db%7C%7C0%7D%3B%24jscomp.generator.Context.prototype.enterCatchBlock%3Dfunction(a)%7Bthis.catchAddress_%3Da%7C%7C0%3Ba%3Dthis.abruptCompletion_.exception%3Bthis.abruptCompletion_%3Dnull%3Breturn%20a%7D%3B%24jscomp.generator.Context.prototype.enterFinallyBlock%3Dfunction(a%2Cb%2Cc)%7Bc%3Fthis.finallyContexts_%5Bc%5D%3Dthis.abruptCompletion_%3Athis.finallyContexts_%3D%5Bthis.abruptCompletion_%5D%3Bthis.catchAddress_%3Da%7C%7C0%3Bthis.finallyAddress_%3Db%7C%7C0%7D%3B%24jscomp.generator.Context.prototype.leaveFinallyBlock%3Dfunction(a%2Cb)%7Bvar%20c%3Dthis.finallyContexts_.splice(b%7C%7C0)%5B0%5D%3Bif(c%3Dthis.abruptCompletion_%3Dthis.abruptCompletion_%7C%7Cc)%7Bif(c.isException)return%20this.jumpToErrorHandler_()%3Bvoid%200!%3Dc.jumpTo%26%26this.finallyAddress_%3Cc.jumpTo%3F(this.nextAddress%3Dc.jumpTo%2Cthis.abruptCompletion_%3Dnull)%3Athis.nextAddress%3Dthis.finallyAddress_%7Delse%20this.nextAddress%3Da%7D%3B%24jscomp.generator.Context.prototype.forIn%3Dfunction(a)%7Breturn%20new%20%24jscomp.generator.Context.PropertyIterator(a)%7D%3B%24jscomp.generator.Context.PropertyIterator%3Dfunction(a)%7Bthis.object_%3Da%3Bthis.properties_%3D%5B%5D%3Bfor(var%20b%20in%20a)this.properties_.push(b)%3Bthis.properties_.reverse()%7D%3B%24jscomp.generator.Context.PropertyIterator.prototype.getNext%3Dfunction()%7Bfor(%3B0%3Cthis.properties_.length%3B)%7Bvar%20a%3Dthis.properties_.pop()%3Bif(a%20in%20this.object_)return%20a%7Dreturn%20null%7D%3B%24jscomp.generator.Engine_%3Dfunction(a)%7Bthis.context_%3Dnew%20%24jscomp.generator.Context%3Bthis.program_%3Da%7D%3B%24jscomp.generator.Engine_.prototype.next_%3Dfunction(a)%7Bthis.context_.start_()%3Bif(this.context_.yieldAllIterator_)return%20this.yieldAllStep_(this.context_.yieldAllIterator_.next%2Ca%2Cthis.context_.next_)%3Bthis.context_.next_(a)%3Breturn%20this.nextStep_()%7D%3B%24jscomp.generator.Engine_.prototype.return_%3Dfunction(a)%7Bthis.context_.start_()%3Bvar%20b%3Dthis.context_.yieldAllIterator_%3Bif(b)return%20this.yieldAllStep_(%22return%22in%20b%3Fb%5B%22return%22%5D%3Afunction(c)%7Breturn%7Bvalue%3Ac%2Cdone%3A!0%7D%7D%2Ca%2Cthis.context_%5B%22return%22%5D)%3Bthis.context_%5B%22return%22%5D(a)%3Breturn%20this.nextStep_()%7D%3B%24jscomp.generator.Engine_.prototype.throw_%3Dfunction(a)%7Bthis.context_.start_()%3Bif(this.context_.yieldAllIterator_)return%20this.yieldAllStep_(this.context_.yieldAllIterator_%5B%22throw%22%5D%2Ca%2Cthis.context_.next_)%3Bthis.context_.throw_(a)%3Breturn%20this.nextStep_()%7D%3B%24jscomp.generator.Engine_.prototype.yieldAllStep_%3Dfunction(a%2Cb%2Cc)%7Btry%7Bvar%20d%3Da.call(this.context_.yieldAllIterator_%2Cb)%3B%24jscomp.generator.ensureIteratorResultIsObject_(d)%3Bif(!d.done)return%20this.context_.stop_()%2Cd%3Bvar%20e%3Dd.value%7Dcatch(f)%7Breturn%20this.context_.yieldAllIterator_%3Dnull%2Cthis.context_.throw_(f)%2Cthis.nextStep_()%7Dthis.context_.yieldAllIterator_%3Dnull%3Bc.call(this.context_%2Ce)%3Breturn%20this.nextStep_()%7D%3B%24jscomp.generator.Engine_.prototype.nextStep_%3Dfunction()%7Bfor(%3Bthis.context_.nextAddress%3B)try%7Bvar%20a%3Dthis.program_(this.context_)%3Bif(a)return%20this.context_.stop_()%2C%7Bvalue%3Aa.value%2Cdone%3A!1%7D%7Dcatch(b)%7Bthis.context_.yieldResult%3Dvoid%200%2Cthis.context_.throw_(b)%7Dthis.context_.stop_()%3Bif(this.context_.abruptCompletion_)%7Ba%3Dthis.context_.abruptCompletion_%3Bthis.context_.abruptCompletion_%3Dnull%3Bif(a.isException)throw%20a.exception%3Breturn%7Bvalue%3Aa%5B%22return%22%5D%2Cdone%3A!0%7D%7Dreturn%7Bvalue%3Avoid%200%2Cdone%3A!0%7D%7D%3B%24jscomp.generator.Generator_%3Dfunction(a)%7Bthis.next%3Dfunction(b)%7Breturn%20a.next_(b)%7D%3Bthis%5B%22throw%22%5D%3Dfunction(b)%7Breturn%20a.throw_(b)%7D%3Bthis%5B%22return%22%5D%3Dfunction(b)%7Breturn%20a.return_(b)%7D%3Bthis%5BSymbol.iterator%5D%3Dfunction()%7Breturn%20this%7D%7D%3B%24jscomp.generator.createGenerator%3Dfunction(a%2Cb)%7Bvar%20c%3Dnew%20%24jscomp.generator.Generator_(new%20%24jscomp.generator.Engine_(b))%3B%24jscomp.setPrototypeOf%26%26a.prototype%26%26%24jscomp.setPrototypeOf(c%2Ca.prototype)%3Breturn%20c%7D%3B%24jscomp.asyncExecutePromiseGenerator%3Dfunction(a)%7Bfunction%20b(d)%7Breturn%20a.next(d)%7Dfunction%20c(d)%7Breturn%20a%5B%22throw%22%5D(d)%7Dreturn%20new%20Promise(function(d%2Ce)%7Bfunction%20f(k)%7Bk.done%3Fd(k.value)%3APromise.resolve(k.value).then(b%2Cc).then(f%2Ce)%7Df(a.next())%7D)%7D%3B%24jscomp.asyncExecutePromiseGeneratorFunction%3Dfunction(a)%7Breturn%20%24jscomp.asyncExecutePromiseGenerator(a())%7D%3B%24jscomp.asyncExecutePromiseGeneratorProgram%3Dfunction(a)%7Breturn%20%24jscomp.asyncExecutePromiseGenerator(new%20%24jscomp.generator.Generator_(new%20%24jscomp.generator.Engine_(a)))%7D%3Bvar%20rideID%3Dwindow.location.pathname.split(%22%2F%22)%3BrideID%3DrideID%5BrideID.length-1%5D%3Bvar%20lastTrainerUpdate%3D0%3Bfunction%20convertResistance(a%2Cb)%7Breturn%7Bpercent%3A%7Bmin%3AMath.floor(a%2F200*100)%2Cmax%3AMath.floor(b%2F200*100)%2Cavg%3AMath.floor((a%2Bb)%2F2%2F200*100)%7D%2Cwatts%3A%7Bmin%3Aa%2Cmax%3Ab%2Cavg%3AMath.floor((a%2Bb)%2F2)%7D%7D%7Dfunction%20getBluetoothAddress()%7Bvar%20a%2Cb%2Cc%3Breturn%20%24jscomp.asyncExecutePromiseGeneratorProgram(function(d)%7Bif(1%3D%3Dd.nextAddress)return%20d.yield(fetch(%22http%3A%2F%2F127.0.0.1%3A8000%2Fdiscover%22)%2C2)%3Bif(3!%3Dd.nextAddress)return%20a%3Dd.yieldResult%2Cd.yield(a.json()%2C3)%3Bb%3Dd.yieldResult%3Bc%3Db.find(function(e)%7Breturn%20e.name.toLowerCase().includes(%22tacx%22)%7D)%3Breturn%20d%5B%22return%22%5D(c.address)%7D)%7Dfunction%20setTrainerResistance(a%2Cb%2Cc)%7Bvar%20d%2Ce%3Breturn%20%24jscomp.asyncExecutePromiseGeneratorProgram(function(f)%7Bswitch(f.nextAddress)%7Bcase%201%3Ad%3DMath.floor(Date.now()%2F1E3)%3Bif(b%3D%3D%3Dc%26%265%3Ed-lastTrainerUpdate)return%20f%5B%22return%22%5D()%3BlastTrainerUpdate%3Dd%3Bconsole.log(%22Setting%20resistance%20of%20trainer%20at%20%22%2Ba%2B%22%20to%20%22%2Bb%2B%22%20(last%20value%3A%20%22%2Bc%2B%22)%22)%3Bf.setCatchFinallyBlocks(2)%3Breturn%20f.yield(fetch(%22http%3A%2F%2F127.0.0.1%3A8000%2Ftrainer%2F%22%2Ba%2B%22%2Fresistance%2F%22%2Bb%2C%7Bmethod%3A%22POST%22%7D)%2C4)%3Bcase%204%3Areturn%20e%3Df.yieldResult%2Cf.yield(e.json()%2C5)%3Bcase%205%3Aconsole.log(%22success%20setting%20trainer%20resistance%22)%3Bf.leaveTryBlock(0)%3Bbreak%3Bcase%202%3Af.enterCatchBlock()%2Cconsole.err(%22failed%20to%20set%20trainer%20resistance%22)%2Cf.jumpToEnd()%7D%7D)%7Dfetch(%22https%3A%2F%2Fapi.onepeloton.com%2Fapi%2Fride%2F%22%2BrideID%2B%22%2Fdetails%3Fstream_source%3Dmultichannel%22%2C%7Bheaders%3A%7Baccept%3A%22application%2Fjson%2C%20text%2Fplain%2C%20*%2F*%22%2C%22accept-language%22%3A%22en-US%22%2C%22peloton-platform%22%3A%22web%22%2C%22sec-fetch-dest%22%3A%22empty%22%2C%22sec-fetch-mode%22%3A%22cors%22%2C%22sec-fetch-site%22%3A%22same-site%22%2C%22x-requested-with%22%3A%22XmlHttpRequest%22%7D%2Creferrer%3A%22https%3A%2F%2Fmembers.onepeloton.com%2Fclasses%2Fplayer%2F%22%2BrideID%2CreferrerPolicy%3A%22no-referrer-when-downgrade%22%2Cbody%3Anull%2Cmethod%3A%22GET%22%2Cmode%3A%22cors%22%2Ccredentials%3A%22include%22%7D).then(function(a)%7Breturn%20a.json()%7D).then(function(a)%7Bfunction%20b(g)%7Bif(g%3Ddocument.querySelector(%22p%5Bdata-test-id%3D'time-to-complete'%5D%22))if(g%3Dg.innerHTML.split(%22%3A%22)%2C2%3D%3Dg.length)%7Bg%3Dc-(60*Number(g%5B0%5D)%2BNumber(g%5B1%5D))%2BNumber(a.ride.pedaling_start_offset)%3Bfor(var%20t%3Dg%2B10%2Cr%3D0%3Br%3Ca.instructor_cues.length%3Br%2B%2B)%7Bvar%20h%3Da.instructor_cues%5Br%5D%3Bconsole.log(h.offsets)%3BadjRes%3DconvertResistance(h.resistance_range.lower%2Ch.resistance_range.upper)%3Bt%3E%3DNumber(h.offsets.start)%26%26t%3C%3DNumber(h.offsets.end)%26%26(d%26%26setTrainerResistance(d%2CadjRes.watts.min%2Ce)%2Ce%3DadjRes.watts.min)%3Bif(g%3E%3DNumber(h.offsets.start)%26%26g%3C%3DNumber(h.offsets.end))%7Bview%3D%22%3Cdiv%20class%3D'metricDetail'%3Eresistance%20(peloton)%3A%20%22%2Bh.resistance_range.lower%2B%22%20-%20%22%2Bh.resistance_range.upper%2B%22%3C%2Fdiv%3E%22%3Bview%2B%3D%22%3Cdiv%20class%3D'metricDetail'%3Eresistance%20(adj%20-%20%25)%3A%20%22%2BadjRes.percent.min%2B%22%20-%20%22%2BadjRes.percent.max%2B%22%20%25%3C%2Fdiv%3E%22%3Bview%2B%3D%22%3Cdiv%20class%3D'metricDetail'%3Ecadence%3A%20%22%2Bh.cadence_range.lower%2B%22%20-%20%22%2Bh.cadence_range.upper%2B%22%20RPM%20%3C%2Fdiv%3E%22%3Bu.innerHTML%3Dview%3Bg%3D%3DNumber(h.offsets.start)%3F(n.style.transition%3D%22none%22%2Cn.style.width%3D%220%25%22)%3A(n.style.transition%3D%22990ms%20linear%22%2Cn.style.width%3DMath.round((g-h.offsets.start)%2F(h.offsets.end-h.offsets.start)*100)%2B%22%25%22)%3Bbreak%7D%7D%7D%7Dvar%20c%2Cd%2Ce%2Cf%2Ck%2Cu%2Cn%2Cp%2Cl%2Cq%2Cm%2Cv%2Cw%2Cx%3Breturn%20%24jscomp.asyncExecutePromiseGeneratorProgram(function(g)%7Bif(1%3D%3Dg.nextAddress)return%20c%3DNumber(a.ride.duration)%2Cg.yield(getBluetoothAddress()%2C2)%3Bd%3Dg.yieldResult%3Bconsole.log(%22Bluetooth%20Trainer%20found%20at%3A%20%22%2Bd)%3Bd%26%26setTrainerResistance(d%2C0%2Cnull)%3Be%3D0%3Bf%3Ddocument.createElement(%22style%22)%3Bf.tyle%3D%22text%2Fcss%22%3Bf.innerHTML%3D%22.metricDetail%20%7B%20font-size%3A%2030px%3B%20height%3A%2050px%3B%20%7D%22%3Bdocument.getElementsByTagName(%22head%22)%5B0%5D.appendChild(f)%3Bk%3Ddocument.createElement(%22div%22)%3Bk.id%3D%22cadresist%22%3Bk.style%3D%22color%3Awhite%3B%20position%3Aabsolute%3B%20bottom%3A%20180px%3B%20left%3A%2040px%3B%22%3Bk.innerHTML%3D'%3Cdiv%20id%3D%22cadresisttxt%22%20style%3D%22width%3A100%25%3Bcolor%3Awhite%3B%22%3Emetrics%20start%20during%20warmup%3C%2Fdiv%3E%3Cdiv%20style%3D%22margin-top%3A10px%3Bwidth%3A100%25%3B%20height%3A2px%3B%20background-color%3A%23555555%22%3E%3Cdiv%20id%3D%22cadresistprogress%22%20style%3D%22width%3A0%25%3Btransition%3A990ms%20linear%3Bheight%3A2px%3Bbackground-color%3Awhite%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E'%3Bdocument.querySelector(%22div%5Bclass%3D'jw-wrapper%20jw-reset'%5D%22).after(k)%3Bu%3Ddocument.getElementById(%22cadresisttxt%22)%3Bn%3Ddocument.getElementById(%22cadresistprogress%22)%3Bif(!a.instructor_cues.length)return%20k.innerHTML%3D%22Class%20does%20not%20have%20target%20metrics.%22%2CsetTimeout(function()%7Bk.innerHTML%3D%22%22%7D%2C5E3)%2Cg%5B%22return%22%5D()%3Bp%3D%5B%5D%3Bl%3Da.instructor_cues%5B0%5D%3Bfor(q%3D1%3Bq%3Ca.instructor_cues.length%3Bq%2B%2B)m%3Da.instructor_cues%5Bq%5D%2Cl.resistance_range.upper%3D%3Dm.resistance_range.upper%26%26l.resistance_range.lower%3D%3Dm.resistance_range.lower%26%26l.cadence_range.upper%3D%3Dm.cadence_range.upper%26%26l.cadence_range.lower%3D%3Dm.cadence_range.lower%3Fl.offsets.end%3Dm.offsets.end%3A(p.push(l)%2Cl%3Dm)%3Bp.push(m)%3Ba.instructor_cues%3Dp%3Bv%3Ddocument.querySelector(%22div%5Bclass%3D'player-overlay-wrapper'%5D%22)%3Bw%3D%7Battributes%3A!0%2CchildList%3A!0%2Csubtree%3A!0%2CcharacterData%3A!0%7D%3Bx%3Dnew%20MutationObserver(b)%3Bx.observe(v%2Cw)%3Bg.jumpToEnd()%7D)%7D)%3Bvoid+0
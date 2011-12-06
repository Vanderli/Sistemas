<? if($_GET['msg_enviada']): ?>
<div id="msg_vazio"><?=$_GET['msg_enviada']?></div>
<? endif; ?>

<!-- Mensagem de Erro -->
<div class="msg_errors">
    <img src="../img/msg_errors/alert.png" alt="Error" />
    <h4>Verifique o preenchimento dos campos abaixo</h4>
        <ol>
            <li><label for="fc_nome"  class="error">Informe o Nome.</label></li>
            <li><label for="fc_sexo"  class="error">Informe o Sexo.</label></li>
            <li><label for="fc_pais"  class="error">Informe o Pa&iacute;s.</label></li>
            <li><label for="fc_cidade"class="error">Informe a Cidade.</label></li>
            <li><label for="fc_estado"class="error">Informe o Estado.</label></li>
            <li><label for="fc_email" class="error">Insira um Email v&aacute;lido.</label></li>
            <li><label for="fc_tel1"  class="error">Informe o DDD.</label></li>
            <li><label for="fc_tel2"  class="error">Informe o Telefone.</label></li>
            <li><label for="fc_assunto"class="error">Informe o Assunto.</label></li>
            <li><label for="msg"       class="error">Digite a Mensagem.</label></li>
        </ol>
</div>

<div id="cont_faleconosco">  
    <h3>Fale Conosco</h3>
    <form id="fc_estrut" method="post" name="fc_estrut" action="enviar-email.php">
        <ul>
            <li>
                <label>Nome completo</label>
                <input name="fc_nome" type="text" id="fc_nome" maxlength="100" class="{validate:{required:true}}"/>
            </li>
            <li>
                <label for="fc_sexo" class="fc_lab">Sexo</label>
                <label for="fc_pais" class="fc_lab">Pa&iacute;s</label>
            </li>
            <li>
                <select id="fc_sexo" name="fc_sexo" class="{validate:{required:true}}">
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>                        
                </select>
                
                <select id="fc_pais" name="fc_pais" class="{validate:{required:true}}">
                    <option value="�frica do Sul">&Aacute;frica do Sul</option>
                    <option value="Alb�nia">Alb&acirc;nia</option>
                    <option value="Alemanha">Alemanha</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antigua">Antigua</option>
                    <option value="Ar�bia Saudita">Ar&aacute;bia Saudita</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Arm&#281;nia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Austr�lia">Austr&aacute;lia</option>
                    <option value="�ustria">&Aacute;ustria</option>
                    <option value="Azerbaijao">Azerbaij&#259;o</option>
                    
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrein">Bahrein</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="B�lgica">B&eacute;lgica</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermudas">Bermudas</option>
                    <option value="Bol�via">Bol&iacute;via</option>
                    <option value="Botsuana">Botsuana</option>
                    <option value="Brasil" selected>Brasil</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulg�ria">Bulg&aacute;ria</option>
                    <option value="Burkina Fasso">Burkina Fasso</option>
                    <option value="Butao">But&#259;o</option>
                    
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Camaroes">Camar&#337;es</option>
                    <option value="Camboja">Camboja</option>
                    <option value="Canad�">Canad&aacute;</option>
                    <option value="Cazaquistao">Cazaquist&#259;o</option>
                    <option value="Chade">Chade</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Cidade do Vaticano">Cidade do Vaticano</option>
                    <option value="Col�mbia">Col&ocirc;mbia</option>
                    <option value="Congo">Congo</option>
                    <option value="Cor�ia do Sul">Cor&eacute;ia do Sul</option>
                    <option value="Costa do Marfim">Costa do Marfim</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cro�cia">Cro&aacute;cia</option>
                    
                    <option value="Dinamarca">Dinamarca</option>
                    <option value="Djibuti">Djibuti</option>
                    <option value="Dominica">Dominica</option>
                    
                    <option value="EUA">EUA</option>
                    <option value="Egito">Egito</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Emirados �rabes">Emirados &Aacute;rabes</option>
                    <option value="Equador">Equador</option>
                    <option value="Eritr�ia">Eritr&eacute;ia</option>
                    <option value="Esc�cia">Esc&oacute;cia</option>
                    <option value="Eslov�quia">Eslov&aacute;quia</option>
                    <option value="Eslovenia">Eslov&#281;nia</option>
                    <option value="Espanha">Espanha</option>
                    <option value="Est�nia">Est&ocirc;nia</option>
                    <option value="Eti�pia">Eti&oacute;pia</option>
                    
                    <option value="Fiji">Fiji</option>
                    <option value="Filipinas">Filipinas</option>
                    <option value="Finl�ndia">Finl&acirc;ndia</option>
                    <option value="Fran�a">Fran&ccedil;a</option>
                    
                    <option value="Gabao">Gab&#259;o</option>
                    <option value="G�mbia">G&acirc;mbia</option>
                    <option value="Gana">Gana</option>
                    <option value="Ge�rgia">Ge&oacute;rgia</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Granada">Granada</option>
                    <option value="Gr�cia">Gr&eacute;cia</option>
                    <option value="Guadalupe">Guadalupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guiana">Guiana</option>
                    <option value="Guiana Francesa">Guiana Francesa</option>
                    <option value="Guin�-bissau">Guin&eacute;-bissau</option>
                    
                    <option value="Haiti">Haiti</option>
                    <option value="Holanda">Holanda</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungria">Hungria</option>
                                        
                    <option value="Iemen">I&#281;men</option>
                    <option value="Ilhas Cayman">Ilhas Cayman</option>
                    <option value="Ilhas Cook">Ilhas Cook</option>
                    <option value="Ilhas Cura�ao">Ilhas Cura&ccedil;ao</option>
                    <option value="Ilhas Marshall">Ilhas Marshall</option>
                    <option value="Ilhas Turks & Caicos">Ilhas Turks & Caicos</option>
                    <option value="Ilhas Virgens (brit.)">Ilhas Virgens (brit.)</option>
                    <option value="Ilhas Virgens(amer.)">Ilhas Virgens(amer.)</option>
                    <option value="Ilhas Wallis e Futuna">Ilhas Wallis e Futuna</option>
                    <option value="�ndia">&Iacute;ndia</option>
                    <option value="Indon�sia">Indon&eacute;sia</option>
                    <option value="Inglaterra">Inglaterra</option>
                    <option value="Irlanda">Irlanda</option>
                    <option value="Isl�ndia">Isl&acirc;ndia</option>
                    <option value="Israel">Israel</option>
                    <option value="It�lia">It&aacute;lia</option>
                    
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japao">Jap&#259;o</option>
                    <option value="Jord�nia">Jord&acirc;nia</option>
                    
                    <option value="Kuwait">Kuwait</option>
                    
                    <option value="Latvia">Latvia</option>
                    <option value="L�bano">L&iacute;bano</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Litu�nia">Litu&acirc;nia</option>
                    <option value="Luxemburgo">Luxemburgo</option>
                    
                    <option value="Macau">Macau</option>
                    <option value="Maced�nia">Maced&ocirc;nia</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Mal�sia">Mal&aacute;sia</option>
                    <option value="Malaui">Malaui</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marrocos">Marrocos</option>
                    <option value="Martinica">Martinica</option>
                    <option value="Maurit�nia">Maurit&acirc;nia</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="M�xico">M&eacute;xico</option>
                    <option value="Moldova">Moldova</option>
                    <option value="M�naco">M&ocirc;naco</option>
                    <option value="Montserrat">Montserrat</option>
                    
                    <option value="Nepal">Nepal</option>
                    <option value="Nicar�gua">Nicar&aacute;gua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nig�ria">Nig&eacute;ria</option>
                    <option value="Noruega">Noruega</option>
                    <option value="Nova Caled�nia">Nova Caled&ocirc;nia</option>
                    <option value="Nova Zel�ndia">Nova Zel&acirc;ndia</option>
                    
                    <option value="Oma">Om&#259;</option>
                    
                    <option value="Palau">Palau</option>
                    <option value="Panam�">Panam&aacute;</option>
                    <option value="Papua-nova Guin�">Papua-nova Guin&eacute;</option>
                    <option value="Paquistao">Paquist&#259;o</option>
                    <option value="Paraguai">Paraguai</option>
                    <option value="Peru">Peru</option>
                    <option value="Polin�sia Francesa">Polin&eacute;sia Francesa</option>
                    <option value="Pol�nia">Pol&ocirc;nia</option>
                    <option value="Porto Rico">Porto Rico</option>
                    <option value="Portugal">Portugal</option>
                    
                    <option value="Qatar">Qatar</option>
                    <option value="Quenia">Qu&#281;nia</option>
                    
                    <option value="Rep. Dominicana">Rep. Dominicana</option>
                    <option value="Rep. Tcheca">Rep. Tcheca</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romenia">Rom&#281;nia</option>
                    <option value="Ruanda">Ruanda</option>
                    <option value="R�ssia">R&uacute;ssia</option>
                    
                    <option value="Saipan">Saipan</option>
                    <option value="Samoa Americana">Samoa Americana</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serra Leone">Serra Leone</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Singapura">Singapura</option>
                    <option value="S�ria">S&iacute;ria</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="St. Kitts & Nevis">St. Kitts & Nevis</option>
                    <option value="St. L�cia">St. L&uacute;cia</option>
                    <option value="St. Vincent">St. Vincent</option>
                    <option value="Sudao">Sud&#259;o</option>
                    <option value="Su�cia">Su&eacute;cia</option>
                    <option value="Sui�a">Sui&ccedil;a</option>
                    <option value="Suriname">Suriname</option>
                    
                    <option value="Tail�ndia">Tail&acirc;ndia</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tanz�nia">Tanz&acirc;nia</option>
                    <option value="Togo">Togo</option>
                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                    <option value="Tun�sia">Tun&iacute;sia</option>
                    <option value="Turquia">Turquia</option>
                    
                    <option value="Ucr�nia">Ucr&acirc;nia</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Uruguai">Uruguai</option>
                    
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietna">Vietn&#259;</option>
                    
                    <option value="Zaire">Zaire</option>
                    <option value="Z�mbia">Z&acirc;mbia</option>
                    <option value="Zimb�bue">Zimb&aacute;bue</option>
                </select>
            </li>
            <li>
                <label for="fc_estado" class="fc_lab">Estado</label>
                <label for="fc_cidade" class="fc_lab">Cidade</label>        
            </li>        
            <li>
                <input name="fc_estado" type="text" id="fc_estado" maxlength="100" class="{validate:{required:true}}"/>
                <input name="fc_cidade" type="text" id="fc_cidade" maxlength="100" class="{validate:{required:true}}"/>
            </li>
            <li>
                <label>E-mail</label>
                <input name="fc_email" type="text" id="fc_email" maxlength="100" class="{validate:{required:true,email:true}}"/>
            </li>      
            <li>
                <label id="fc_ddd">DDD</label>
                <label class="fc_lab">Telefone</label>
            </li>
            <li>
                <input id="fc_tel1" maxlength="2" name="fc_tel1" type="text" class="{validate:{required:true}}" />
                <input id="fc_tel2" maxlength="9" name="fc_tel2" type="text" class="{validate:{required:true}}"/>
            	<p>(Somente N&uacute;meros)</p>
            </li>
            <li>
                <label>Assunto</label>
                <select name="assunto" id="fc_assunto" class="{validate:{required:true}}">
                    <option value="">Escolha</option>						  
                    <option value="Opiniao">Opini&atilde;o</option>
                    <option value="Sugestao">Sugest&atilde;o</option>
                    <option value="Critica">Cr&iacute;tica</option>
                    <option value="Duvida">D&uacute;vida</option>
                    <option value="Elogio">Elogio</option>			 	    
                </select>
            </li>
            <li>
                <label>Mensagem</label>
                <textarea id="msg" maxlength="2500" name="fc_msg" rows="8" class="{validate:{required:true}}"></textarea>
                <p>m&aacute;ximo de 2500 caracteres</p>
            </li>
            <li id="fc_btns">
                <input id="fc_enviar" name="fc_enviar" type="submit" value="Enviar" />
                <input id="fc_limpar" name="fc_limpar" type="reset" value="Limpar" />
            </li>
        </ul>
    </form> 
</div>
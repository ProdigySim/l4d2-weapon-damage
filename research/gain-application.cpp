
ClearMultiDamage();
pWeaponInfo = pWeaponInfo_;
flDistance = fsqrt(flDistancePrecalc);
flDamage = (float)*(signed int *)(pWeaponInfo_ + 2508);
if ( flDistance == 0.0 )
  goto LABEL_90;
v79 = (__m128)(unsigned int)fl_zeropointzerozerotwo;
v79.m128_f32[0] = 0.0020000001 * flDistance;
v80 = (unsigned __int128)_mm_cvtps_pd(_mm_unpacklo_ps(v79, v79));
flRangeModifier = _mm_cvtps_pd((__m128)*(_DWORD *)(pWeaponInfo_ + 2516));
v82 = _pow_finite(
        (_DWORD)flRangeModifier.m128d_f64[0],
        (unsigned __int64)flRangeModifier.m128d_f64[0] >> 32,
        v80,
        HIDWORD(v80));
flGainRange = *(_DWORD *)(pWeaponInfo + 3160);
flRange = *(_DWORD *)(pWeaponInfo + 2512);
LODWORD(v143) = (unsigned __int128)_mm_cvtpd_ps(_mm_movedup_pd((__m128d)COERCE_UNSIGNED_INT64(v82)));
if ( flDistance <= *(float *)&flGainRange || *(float *)&flGainRange == 0.0 )
{
  flDamage = v143 * flDamage;
  goto LABEL_90;
}
if ( flDistance <= *(float *)&flRange )
{
  v114 = v143 * flDamage;
  v115 = Gain(
            (float)((float)(flDistance - *(float *)&flGainRange)
                  / (float)(*(float *)&flGainRange - *(float *)&flRange))
          + 1.0,
            0x3F4CCCCDu);            // 0x3f4cccd == 0.80
  flDamage = v115 * v114;
LABEL_90:
  v85 = v196;
  if ( !v196 )
    goto LABEL_169;
  goto LABEL_91;
}
flDamage = 0.0;
v85 = v196;
if ( !v196 )
  goto LABEL_169;
LABEL_91:
if ( !v347
  || (v86 = CBaseEntity::GetTeamNumber(v347),
      v87 = (unsigned __int8)IsASurvivorTeam(v86) == 0,
      v85 = v196,
      v87) )
  goto LABEL_93;
v111 = CBaseEntity::GetTeamNumber(v196);
if ( !(unsigned __int8)IsASurvivorTeam(v111) )
  goto LABEL_187;
v112 = v196;
if ( v196 )
{
  if ( (unsigned __int8)(*(int (__cdecl **)(int))(*(_DWORD *)v196 + 364))(v196)
    && (unsigned __int8)(*(int (__cdecl **)(int))(*(_DWORD *)v112 + 2024))(v112) )
    goto LABEL_69;
LABEL_187:
  v85 = v196;
  goto LABEL_93;
}
LABEL_169:
v85 = 0;
LABEL_93:
CTakeDamageInfo::CTakeDamageInfo(&v304, v85, v85, LODWORD(flDamage), v205, 0);